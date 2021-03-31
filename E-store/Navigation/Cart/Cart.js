import React from 'react';
import { View, Dimensions, StyleSheet, Button } from 'react-native';
import { Container, Text, Left, Right, H1, ListItem, Thumbnail, Body} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions"

const windowHeight = Dimensions.get('window').height;

const Cart = (props) => {
    let total = 0;
    props.cartItems.forEach(cart => {
        return (total += cart.product.price)
    });
    
    return(
        //React fragment acts as a container
        <>
          {props.cartItems.length ? (
              <Container>
                   <H1 style={{alignSelf: "center"}}>Cart</H1>
                   {props.cartItems.map(data => {
                       return(
                           <ListItem style={styles.listItem} key={Math.random()} avatar>
                                <Left>
                                    <Thumbnail source={{uri: data.product.image? data.product.image : "https://www.clipartmax.com/png/middle/16-161739_box-clipart-empty-box-red-box-clipart.png"}}/>
                                </Left>
                                <Body style={styles.body}>
                                    <Left>
                                        <Text>{data.product.name}</Text>
                                    </Left>
                                    <Right>
                                        <Text>${data.product.price}</Text>
                                    </Right>
                                </Body>
                           </ListItem>
                       )
                   })}
                   <View style={styles.bottomContainer}>
                       <Left>
                           <Text style={styles.price}>${total}</Text>
                       </Left>
                       <Right>
                           <Button title="clear" onPress= {() => props.clearCart()}/>
                       </Right>
                       <Right>
                           <Button title="Checkout" onPress={() => props.navigation.navigate("Checkout")}/>
                       </Right>
                   </View>
              </Container>
          ) : (
              <Container style={styles.emptyContainer}>
                  <Text>Products In Your Cart Will Appear Here</Text>
              </Container>
          )}
        </>
    )
}

//Called everytime the store state changes
const mapStateToProps = (state) => {
    const { cartItems } = state;
    return{
        cartItems: cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        clearCart: () => dispatch(actions.clearCart())
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        height: windowHeight,
        alignItems: "center",
        justifyContent: "center"
    },
    listItem: {
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center"
    },
    body: {
        margin: 10,
        alignItems: "center",
        flexDirection: "row"
    },
    bottomContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        left:0,
        backgroundColor: "#ffffff",
        elevation:20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: "red"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
