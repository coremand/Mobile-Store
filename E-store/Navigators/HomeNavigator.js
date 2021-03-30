import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import ProductContainer from "../Navigation/Products/ProductContainer";
import singleProduct from "../Navigation/Products/singleProduct";

const Stack = createStackNavigator()


function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Home'
                component={ProductContainer}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen 
                name='Product Detail'
                component={singleProduct}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}