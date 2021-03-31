import React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import ProductCard from "./ProductCard";

var windowWidth = Dimensions.get('window').width;


export default function ProductList({item, navigation }) {
    return (
        <TouchableOpacity style={{Width: "50%"}} onPress={() => navigation.navigate("Product Detail", { item: item})}>
            <View style={{width: windowWidth / 2, backgroundColor: "#e8e7e3"}}>
                <ProductCard {...item} />
            </View>
        </TouchableOpacity>
    )
}
