import React, { useState, useEffect} from 'react'
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native'
import {Left, Right, Container, H1} from "native-base";

export default function singleProduct(props) {
    //Setting Item from Item on ProductList, Item is passed through the navigation
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState("");

    return (
        <Container style={styles.container}>
             <ScrollView style={{ marginBottom: 80, padding: 5}}>
                 <View>
                    <Image style={styles.image}  source={{uri: item.image? item.image : 
                        "https://www.clipartmax.com/png/middle/16-161739_box-clipart-empty-box-red-box-clipart.png"}} 
                        resizeMode="contain"
                    />
                 </View>
                 <View style={styles.details}>
                    <H1 style={styles.Header}>{item.name}</H1>
                    <Text style={styles.text}>{item.brand}</Text>
                 </View>
             </ScrollView>

             <View style={styles.bottomContainer}>
                <Left>
                    <Text style={styles.price}>${item.price}</Text>
                </Left>
                <Right>
                    <Button title="Add To Cart" />
                </Right>
             </View>
        </Container>
    )
}



const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: "100%"
      },
    ImageContainer: {
        backgroundColor: "white",
        padding: 0,
        margin: 0
    },
    image: {
        width: "100%",
        height: 250
    },
    details: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    Header: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red'
    }
})
