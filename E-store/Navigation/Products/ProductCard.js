import React from 'react'
import { View, Text, StyleSheet, Dimensions,Image, Button } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductCard({key, item}) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} resizeMode="contain" source={{uri: item.image? item.image : "https://www.clipartmax.com/png/middle/16-161739_box-clipart-empty-box-red-box-clipart.png"}}/>
            <View style={styles.card}/>
            <Text style={styles.title}>
                {item.name.length > 15 ? item.name.substring(0, 15 - 3) + "..." : item.name}
            </Text>
            <Text style={styles.price}>${item.price}</Text>

            { item.countInStock > 0 ? (
                <View style={{marginBottom: 60}}>
                    <Button title={"Add to Cart"} color={"green"} />
                </View>) : <Text style={{marginTop: 20}}>
                    Product Not Available
                </Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      width: windowWidth / 2 - 20,
      height: windowWidth / 1.7,
      padding: 10,
      borderRadius: 10,
      marginTop: 55,
      marginBottom: 5,
      marginLeft: 10,
      alignItems: "center",
      elevation: 8,
      backgroundColor: "white"
    },
    image: {
        width: windowWidth / 2 -20 - 10,
        height: windowWidth / 2 - 20 -30,
        backgroundColor: "transparent",
        position: "absolute",
        top: -45
    },
    card: {
        marginBottom: 10,
        height: windowWidth / 2 - 20 - 90,
        backgroundColor: "transparent",
        width: windowWidth / 2 - 20 - 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center"
    },
    price: {
        fontSize: 20,
        color: "orange",
        marginTop: 10,
        textAlign: "center"
    }

});
  
