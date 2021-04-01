import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Components/Form/FormContainer";
import Input from "../../Components/Form/Input";
import Error from "../../Components/Error"

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        const user = {
          email,
          password,
        };
    
        if (email === "" || password === "") {
          setError("Please enter text in empty field");
        } else {
          loginUser(user, context.dispatch);
        }
      };

    return (
        <FormContainer title={"Login"}>
            <Input placeholder={"Enter Email"} name={"email"} id={"email"} value={email} onChangeText={(text) => setEmail(text)} />
            <Input placeholder={"Enter Password"} name={"password"} id={"password"} secureTextEntry={true} value= {password} onChangeText={(text) => setPassword(text.toLowerCase)} />
            <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null}
                <Button title="Login" onPress={() => handleSubmit()}/>
            </View>
            <View style={[{ marginTop: 40}, styles.buttonGroup]}>
                <Text style={styles.middleText}>Need To Sign up?</Text>
                <Button title="Register" onPress={() => props.navigation.navigate("Register")} />
            </View>
        </FormContainer>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
      width: "80%",
      alignItems: "center",
    },
    middleText: {
      marginBottom: 20,
      alignSelf: "center",
    },
  });
