import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Checkout from "../Navigation/Cart/Checkout/Checkout";
import Payment from "../Navigation/Cart/Checkout/Payment";
import Confirm from "../Navigation/Cart/Checkout/Confirm";

const Tab = createMaterialTopTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Shipping" component={Checkout} />
            <Tab.Screen name="Payment" component={Payment} />
            <Tab.Screen name="Confirm" component={Confirm} />
        </Tab.Navigator>
    )
}

export default function CheckoutNavigator(){
    return <MyTabs />
}