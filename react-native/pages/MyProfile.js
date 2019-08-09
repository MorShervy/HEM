import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, AsyncStorage, TouchableOpacity, Dimensions, ImageBackground, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import KeyboardSpacer from 'react-native-keyboard-spacer';


const { height, width } = Dimensions.get("window");

const MyProfile = props => {
    const [getUser, setUser] = useState("");


    useEffect(() => {
        AsyncStorage.getItem("user").then(
            user => setUser(JSON.parse(user))
        ).then()
    }, [])


    return (
        <View style={{ flex: 1 }}>

            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/money.jpg')}
                    style={{ width: '100%', height: '100%' }}
                >

                    <View style={styles.user}>
                        <Image
                            source={(getUser.url === undefined && require('../assets/user.png')) || { uri: getUser.url }}
                            style={styles.img}
                        />
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => console.log("clicked")}
                        >
                            <Ionicons name="md-add-circle-outline" size={50} color='#708090' />
                        </TouchableOpacity>
                        <Text style={styles.label}>{getUser.email}</Text>
                    </View>
                </ImageBackground>
            </View >
            <View style={styles.form}>
                <View style={{ paddingTop: 10 }}>
                    <TextInput
                        style={styles.txtInput}
                        placeholder="Enter First Name"
                    />
                </View>
                <View style={{ paddingTop: 10 }}>
                    <TextInput
                        style={styles.txtInput}
                        placeholder="Enter Last Name"
                    />
                </View>
                <View style={{ paddingTop: 20 }}>

                    <TouchableOpacity
                        style={styles.btnStyle}
                    >
                        <Text style={styles.btnTxt}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <KeyboardSpacer />
        </View>
    );
};
export default MyProfile;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height / 3,
    },
    user: {
        marginTop: height / 4,
        alignSelf: "center",
    },
    img: {
        alignSelf: 'center',
        width: 160,
        height: 160,
        borderRadius: 160 / 2 + 160 / (8 + 14.8), // get radius 
        borderColor: '#708090',
        borderWidth: 5,
    },
    label: {
        alignSelf: 'center',
        marginBottom: 48,
        marginLeft: 10,
        fontWeight: 'bold',
        color: "#000",
    },
    icon: {
        alignSelf: "flex-end",
        position: "absolute"
    },
    form: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignSelf: "center",
        paddingTop: 150,
    },
    txtInput: {
        width: width - 120,
        height: 40,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000'
    },
    btnStyle: {
        height: 40,
        width: width - 120,
        borderWidth: 1,
        backgroundColor: "#2cb54b",
        borderColor: "#289643",

    },
    btnTxt: {
        textAlign: "center",
        fontSize: 18,
        color: "#fff",
    }
});