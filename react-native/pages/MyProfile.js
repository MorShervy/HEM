import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, AsyncStorage, TouchableOpacity, Dimensions, ImageBackground, TextInput, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import CameraScreen from "./CameraScreen";
import SQL from '../handlers/SQL';


const { height, width } = Dimensions.get("window");

const MyProfile = props => {
    const [getUser, setUser] = useState("");
    const [getShowCamera, setShowCamera] = useState(false);
    const [getShowFullName, setShowFullName] = useState(false);
    const [getFirstName, setFirstName] = useState("");
    const [getLastName, setLastName] = useState("");


    useEffect(() => {
        AsyncStorage.getItem("user").then(
            user => setUser(JSON.parse(user))
        ).then()
    }, [])

    const clear = () => {
        setFirstName("");
        setLastName("");
        setShowFullName(false);

    }

    const handleUpdateName = () => {
        const name = getFirstName + ' ' + getLastName;
        console.log("name=", name)
        SQL.UpdateUserName(getUser.email, name).then(res => {
            console.log("res=", res.res)
        }).then(setShowFullName(false)).then(alert("Updated"))

    }

    const handlePicture = (res) => {
        console.log("handlePictrue", res);

        console.log(getUser);
        setShowCamera(false);
    }

    if (getShowCamera) {
        return (
            <Modal
                style={{ flex: 1 }}
                animationType="slide"
                transparent={false}
                visible={getShowCamera}
                onRequestClose={() => {
                    setShowCamera(false);
                }}>

                <CameraScreen navigation={props.navigation} pictureSave={res => handlePicture(res)} />
            </Modal>
        )
    }

    if (getShowFullName) {
        return (
            <Modal
                style={{ flex: 1 }}
                animationType="slide"
                transparent={false}
                visible={getShowFullName}
                onRequestClose={() => clear()}
            >
                <View style={styles.form}>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}>
                            Update Profile
                        </Text>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <TextInput
                            style={styles.txtInput}
                            placeholder="Enter First Name"
                            onChangeText={(e) => setFirstName(e)}
                            value={getFirstName}
                        />
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <TextInput
                            style={styles.txtInput}
                            placeholder="Enter Last Name"
                            onChangeText={(e) => setLastName(e)}
                            value={getLastName}
                        />
                    </View>
                    <View style={{ paddingTop: 20 }}>

                        <TouchableOpacity
                            style={styles.btnStyle}
                            onPress={handleUpdateName}
                        >
                            <Text style={styles.btnTxt}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

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
                            onPress={() => setShowCamera(true)} //props.navigation.navigate('Camera')
                        >
                            <Ionicons name="md-add-circle-outline" size={50} color='#3D9970' />
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.label}>{getUser.email}</Text>
                </ImageBackground>
            </View >
            <View style={{ paddingTop: 200 }}>
                <TouchableOpacity
                    style={styles.btnStyleUpdate}
                    onPress={() => setShowFullName(true)}>
                    <Ionicons
                        style={styles.iconUpdate}
                        name="ios-person-add"
                        size={40}
                        color="#fff"
                    />
                    <Text style={styles.txtUpdate}>Update Full Name</Text>
                </TouchableOpacity>

            </View>
            <KeyboardSpacer />
        </View>
    )



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
        borderColor: '#3D9970',
        borderWidth: 5,
    },
    label: {
        alignSelf: 'center',
        paddingBottom: 48,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: "#000",
    },
    icon: {
        paddingLeft: 140,
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
        backgroundColor: "#2C3E50",
        borderColor: "#2C3E50",
    },
    btnTxt: {
        textAlign: "center",
        fontSize: 18,
        color: "#fff",
    },
    btnStyleUpdate: {
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        height: 40,
        width: width - 120,
        borderWidth: 1,
        backgroundColor: "#2C3E50",
        borderColor: "#2C3E50",
    },
    txtUpdate: {
        alignSelf: "center",
        color: "#fff",
        fontWeight: "bold",
        paddingLeft: 40,
        borderLeftWidth: 1,
        borderLeftColor: "#fff",
    },
    iconUpdate: {
        alignSelf: "center",
        paddingLeft: 20,
        paddingRight: 20,
    }
});