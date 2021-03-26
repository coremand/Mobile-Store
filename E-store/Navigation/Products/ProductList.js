import React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import ProductCard from "./ProductCard";

var windowWidth = Dimensions.get('window').width;


export default function ProductList({key, item}) {
    return (
        <TouchableOpacity style={{Width: "50%"}}>
            <View style={{width: windowWidth / 2, backgroundColor: "red"}}>
                <ProductCard key = {key} item = {item} />
            </View>
        </TouchableOpacity>
    )
}
