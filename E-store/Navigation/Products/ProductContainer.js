import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, FlatList} from 'react-native'
import { Container, Text, Header, Icon, Item, Input } from 'native-base';
import ProductList from "./ProductList";
import SearchProduct from "./SearchProduct"

const data = require("../../data/products.json")

export default function ProductContainer() {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setfilteredProducts] = useState([]);
    const [focus, setFocus] = useState();

    useEffect(() => {
        setProducts(data);
        setfilteredProducts(data);
        setFocus(false);

        return ()=> {
            setProducts([]);
            setfilteredProducts([]);
            setFocus();
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

    return (
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="search" onFocus={openList} onChangeText={(text) => searchProduct(text)}/>
                </Item>
            </Header>
            <View>
             <Text>This is the Product Page</Text>
             <View style={{marginTop: 100}}>
                <FlatList 
                    horizontal
                    data = {products}
                    renderItem = {({item}) => <ProductList key={item.id} item={item} />}
                    keyExtractor={item => item.name}
                />
             </View>
            
            </View>
        </Container>
        
    )
}
