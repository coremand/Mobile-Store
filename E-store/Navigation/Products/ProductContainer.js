import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, FlatList,  ScrollView, Dimensions} from 'react-native'
import { Container, Text, Header, Icon, Item, Input} from 'native-base';
import ProductList from "./ProductList";
import SearchProduct from "./SearchProduct";
import Banner from "../../Components/Banner";
import CategoryFilter from "./CategoryFilter";
import { useFocusEffect } from "@react-navigation/native";

//Backend Connection
import baseURL from "../../assets/common/baseURL";
import axios from "axios";

const windowHeight = Dimensions.get('window').height;

//props for navigation
export default function ProductContainer(props) {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setfilteredProducts] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    //Keeps track of the state of badge
    const [productsCtg, setProductsCtg] = useState([]);
    //Keeps track of when a Category is highlighted
    const [active, setactive] = useState();
    //Keeps track of the elements of category when the page first loads
    const [initialstate, setInitialstate] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setFocus(false);
        
        setactive(-1);

        //Call to backend products

        axios.get(`${baseURL}products`).then((res) => {
            setProducts(res.data);
            setfilteredProducts(res.data);
            setProductsCtg(res.data);
            setInitialstate(res.data);
            setLoading(false)
        })
        .catch((error) => {
            console.log("Api error")
        })

        //Call to backend Categories

        axios.get(`${baseURL}categories`).then((res) => {
            setCategories(res.data);
        })
        .catch((error) => {
            console.log("Api error")
        })

        return ()=> {
            setProducts([]);
            setfilteredProducts([]);
            setFocus();
            setInitialstate();
            setactive();
            setCategories([]);
        }
    }, [])

    const searchProduct = (text) => {
        setfilteredProducts(products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase())))
    }

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }
//Display Product Category
    
    const selectCategory = (ctg) => {
        { ctg === "all" ? [setProductsCtg(initialstate), setactive(true)] : [ setProductsCtg(
            products.filter((i) => i.category._id === ctg), setactive(true)
        )]}
    }

    return (
        <>
        {loading == false ? (
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" onFocus={openList} onChangeText={(text) => searchProduct(text)}/>
                        {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
                </Item>
            </Header>
            {focus == true ? (
                <SearchProduct  filteredProducts={filteredProducts} navigation={props.navigation } />
            ) : (
                    <ScrollView style={{flex: 1}}>
                        <View style={{flex: 1}}>
                            <View>
                               <Banner />
                            </View>
                            <View>
                                <CategoryFilter categories={categories} selectCategory={selectCategory} productsCtg={productsCtg} active={active} setActive={setactive}/>
                            </View>
                            {productsCtg.length > 0 ? (
                                        <View style={styles.listContainer}>
                                            {productsCtg.map((item) => {
                                                return(
                                                    <ProductList key={item._id} item={item} navigation={props.navigation}/>
                                                )
                                            })}
                                        </View>
                                ) : (    
                                        <View style={[styles.center, { height: windowHeight / 2}]}>
                                           <Text>No products found</Text>
                                        </View>
                                )}
                        </View>
                    </ScrollView>
            )}
        </Container>) : (
            <Container style={[styles.center, { backgroundColor: "#f2f2f2"}]}>
                <ActivityIndicator size="large" color="red"/>
            </Container>
        )}
        </>
        
    )
}


const styles = StyleSheet.create({
    container: {
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    listContainer: {
      //height: windowHeight,
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    view: {
        backgroundColor: "#f56c42"
    }
  });
