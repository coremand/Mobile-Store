import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { Content, Left, Body, ListItem, Thumbnail, Text} from "native-base";

const windowWidth = Dimensions.get('window').width;

export default function SearchProduct({ filteredProducts, navigation}) {
    return (
        <Content style={{width:windowWidth}}>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (<ListItem key={item._id.$oid} avatar onPress={() => {navigation.navigate("Product Detail", {item:item})}}>
                    <Left>
                        <Thumbnail 
                          source={{uri: item.image? item.image : "https://www.clipartmax.com/png/middle/16-161739_box-clipart-empty-box-red-box-clipart.png"}}
                        />
                    </Left>

                    <Body>
                        <Text>{item.name}</Text>
                        <Text note>{item.description}</Text>
                    </Body>
                </ListItem>))
            ) : (
                <View style={styles.center}>
                    <Text style={{alignSelf:"center"}}> No Product Found</Text>
                </View>
            )}
        </Content>
    )
}


const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center"
    }
});
