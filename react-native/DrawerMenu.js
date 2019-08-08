import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    SafeAreaView,
    ScrollView, Image,
    AsyncStorage
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerItems } from 'react-navigation';

const DrawerWithLogoutButton = (props) => {
    const [getUser, setUser] = useState("");


    useEffect(() => {
        AsyncStorage.getItem("user").then(
            user => setUser(JSON.parse(user))
        ).then(console.log("user.url=", getUser.url))
    }, [])


    return (
        <ScrollView contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>

                <View style={styles.user}>
                    <Image
                        source={(getUser.url === undefined && require('./assets/user.png')) || { uri: getUser.url }}
                        style={styles.img}
                    />
                    <Text style={styles.label}>{getUser.email}</Text>
                </View>
                <DrawerItems {...props} />
            </SafeAreaView>

            <View style={styles.item}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="ios-home"
                        size={25}
                    />
                </View>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    user: {
        backgroundColor: '#2C3E50',
        paddingTop: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 46,
        width: 24,
        alignItems: 'center',
    },
    img: {
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    label: {
        alignSelf: 'center',
        marginBottom: 48,
        marginLeft: 10,
        fontWeight: 'bold',
        color: "#fff",
    },
})

export default DrawerWithLogoutButton