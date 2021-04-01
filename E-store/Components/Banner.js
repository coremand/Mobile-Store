import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native'
import Swiper from "react-native-swiper/src";

const windowWidth = Dimensions.get("window").width;

export default function Banner() {

    const [banner, setBanner] = useState([
        "https://image.freepik.com/vector-gratis/compras-linea-banner-moderno-tableta-gran-volumen-cajas-regalos-alrededor-sobre-fondo-rosa_7993-6368.jpg",
        "https://c8.alamy.com/comp/2AKGT2Y/electronics-and-devices-promotional-sale-banner-with-full-shopping-cart-technology-and-online-shopping-concept-2AKGT2Y.jpg",
        "https://image.freepik.com/vector-gratis/feliz-dia-padre-venta-banner-o-promocion-sobre-fondo-azul-tienda-compras-linea-movil-tarjetas-credito-elementos-tienda_62391-268.jpg" 
    ]);

    return (
        <ScrollView>
            <View style= {styles.container}>
                <View style = {styles.swiper}>
                    <Swiper showButtons={false} autoplay={true} autoplayTimeout={2} style={{ height: windowWidth / 2}}>
                     {banner.map((item) => {
                         return(
                            <Image key={item} style={styles.image} resizeMode="contain" source={{uri:item}} />
                         )
                     })}
                    </Swiper>
                    <View style={{ height: 20 }}></View>
                </View>
            </View>
        </ScrollView>
        
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gainsboro",
    },
    swiper: {
        width: windowWidth,
        alignItems: "center",
        marginTop: 10
    },
    image: {
        height: windowWidth / 2,
        width: windowWidth - 40,
        borderRadius: 10,
        marginHorizontal: 20
    }
})
