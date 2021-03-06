import React from 'react'
import { View, Text, StyleSheet, Dimensions,Image, Button } from 'react-native';
import { connect } from "react-redux"
import * as actions from "../../Redux/Actions/cartActions"
import Toast from "react-native-toast-message"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProductCard = (props) => {
    const { name, price, image, countInStock } = props;
    return (
        <View style={styles.container}>
            <Image style={styles.image} resizeMode="contain" source={{uri: image? image : "https://www.clipartmax.com/png/middle/16-161739_box-clipart-empty-box-red-box-clipart.png"}}/>
            <View style={styles.card}/>
                <Text style={styles.title}>
                    {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
                </Text>
                <Text style={styles.price}>${price}</Text>

                { countInStock > 0 ? (
                <View style={{marginBottom: 60}}>
                    <Button title={"Add to Cart"} color={"green"} onPress={() => {props.addItemToCart(props), Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: `${name} added to cart`,
                        text2: "Go to Cart to Checkout"
                    })}}/>
                </View>) : <Text style={{marginTop: 20}}>
                    Product Not Available
                </Text>
                }
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch(actions.addToCart({quantity: 1, product}))
    }
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
      backgroundColor: "#ffffff"
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
  
export default connect(null, mapDispatchToProps)(ProductCard);