import React from 'react'
import { ScrollView, Text, Dimensions, StyleSheet } from 'react-native'

const windowWidth = Dimensions.get('window').width;

export default function FormContainer(props) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 400,
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 30
    }
});
