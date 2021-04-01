import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Navigation/User/Login";
import Register from "../Navigation/User/Register";
import UserProfile from "../Navigation/User/UserProfile"

const Stack = createStackNavigator();

const MyStack = () => {
    return (
       <Stack.Navigator>
           <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
           <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
           <Stack.Screen name="UserProfile" component={UserProfile} options={{headerShown: false}} />
       </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />
}
