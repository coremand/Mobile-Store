import React from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem, Badge, Text} from "native-base"

export default function CategoryFilter({categories, selectCategory, active, setActive}) {
    return (
        <ScrollView bounces={true} horizontal={true} style={{backgroundColor:"#f2f2f2"}}>
            <ListItem style={styles.listStyle}>
                <TouchableOpacity key={1} onPress={() => {selectCategory("all"), setActive(-1)}}>
                    <Badge style={[styles.center, {margin: 5}], active == -1 ? styles.active : styles.inactive}>
                        <Text style={{color:"white"}}>All</Text>   
                    </Badge>
                    

                    
                </TouchableOpacity>
              {/*Dynamically render badges*/}
                {categories.map((item) => (
                    <TouchableOpacity key={item._id} onPress={() => {selectCategory(item._id), setActive(categories.indexOf(item))}}>
                        <Badge style={[styles.center, {margin: 5}], active == categories.indexOf(item) ? styles.active : styles.inactive}>
                            <Text style={{color:"white"}}>{item.name}</Text>   
                        </Badge>
                    </TouchableOpacity>
                ))}
                
            </ListItem>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    listStyle: {
        margin: 0,
        padding: 0,
        borderRadius: 0
    },
    active: {
        backgroundColor: "#03bafc",
    },
    inactive: {
        backgroundColor: "#a0e1eb"
    }
});
