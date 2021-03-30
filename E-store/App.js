import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Navigators/Main"
import Header from "./Components/Header"

export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <Main />
    </NavigationContainer>
    
  );
}

