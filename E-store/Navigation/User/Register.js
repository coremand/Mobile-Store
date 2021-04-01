import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Components/Form/FormContainer";
import Input from "../../Components/Form/Input";
import Error from "../../Components/Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import baseURL from "../../assets/common/baseURL";
import Toast from "react-native-toast-message"

export default function Register(props) {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const register = () => {
        if (email === "" || name === "" || phone === "" || password === "") {
          setError("Please fill in the form correctly");
          return
        }

        let user = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            isAdmin: false,
        };

        //register User
        axios.post(`${baseURL}users/register`, user).then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeessful",
            text2: "Please Login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
    }

    return (
        <KeyboardAwareScrollView viewIsInsideTabBar={true} extraHeight={200} enableOnAndroid={true}>
            <FormContainer title={"Register"}>
                <Input placeholder={"Email"} name={"email"} id={"email"} onChangeText={(text) => setEmail(text.toLowerCase())}/>
                <Input placeholder={"Name"} name={"name"} id={"name"} onChangeText={(text) => setName(text.toLowerCase())}/>
                <Input placeholder={"Phone"} name={"phone"} id={"phone"} onChangeText={(text) => setPhone(text)} keyboardType={"numeric"}/>
                <Input placeholder={"Password"} name={"password"} id={"password"} onChangeText={(text) => setPassword(text.toLowerCase())} secureTextEntry={true}/>

                <View style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                </View>
                <View style={styles.buttonGroup}>
                    <Button title={"Register"} onPress={register}/>
                </View>
                <View style={styles.buttonGroup}>
                    <Button title={"Back to Login"} onPress={() => props.navigation.navigate("Login")} />
                </View>
            </FormContainer>
            
        </KeyboardAwareScrollView>
        
        
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
      width: "80%",
      margin: 10,
      alignItems: "center",
    },
  });
  

