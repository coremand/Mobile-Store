import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, FlatList,  ScrollView, Dimensions} from 'react-native'
import { Container, Text, Header, Icon, Item, Input} from 'native-base';
import ProductList from "./ProductList";
import SearchProduct from "./SearchProduct";
import Banner from "../../Components/Banner";
import CategoryFilter from "./CategoryFilter";

const data = require("../../data/products.json");
const categoriesData = require("../../data/categories.json");
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

    useEffect(() => {
        setProducts(data);
        setfilteredProducts(data);
        setFocus(false);
        setCategories(categoriesData);
        setactive(-1);
        setInitialstate(data);
        setProductsCtg(data);

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
            products.filter((i) => i.category.$oid === ctg), setactive(true)
        )]}
    }

    return (
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
                    <ScrollView>
                        <View>
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
                                                    <ProductList key={item._id.$oid} item={item} navigation={props.navigation}/>
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
        </Container>
        
    )
}


const styles = StyleSheet.create({
    container: {
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    listContainer: {
      height: windowHeight,
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
