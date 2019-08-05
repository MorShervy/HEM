import React, { Component } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Dimensions, TextInput, TouchableOpacity } from "react-native";
import Logo from '../components/Logo';

const { width, height } = Dimensions.get("window");

export default function SignIn() {

    return (
        <View style={styles.container}>

            <Logo styles={[styles.logo, styles.image]} />

            <View style={styles.formView}>
                <View style={{ paddingTop: 10 }}>
                    <Text style={styles.txtBold}>Sign In to HEM</Text>
                </View>
                <View style={{ paddingTop: 10 }}>
                    <TextInput style={styles.txtInput}
                        placeholder="Example@example.com"
                    />
                </View>
                <View style={{ paddingTop: 10 }}>
                    <TextInput style={styles.txtInput}
                        placeholder="Password"
                    />
                </View>
                {/* button sign in */}
                <View style={{ paddingTop: 10 }}>
                    <TouchableOpacity style={[styles.btnStyle, styles.btnSignInColor]}>
                        <Text style={styles.btnTxtStyle}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                {/* button sign in facebook */}
                <View style={{ paddingTop: 50 }}>
                    <TouchableOpacity style={[styles.btnStyle, styles.btnFacebookColor]}>
                        <Text style={styles.btnTxtStyle}>Sign In with Facebook</Text>
                    </TouchableOpacity>
                </View>
                {/* butto sign in google */}
                <View style={{ paddingTop: 10 }}>
                    <TouchableOpacity style={[styles.btnStyle, styles.btnGoogleColor]}>
                        <Text style={styles.btnTxtStyle}>Sign In with Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingTop: 50 }}>
                    <Text>First time?</Text>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        alignItems: "center",
        justifyContent: "center",
    },
    txtBold: {
        fontSize: 18,
        fontWeight: "bold"
    },
    txtInput: {
        width: width - 120,
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "black"
    },
    logo: {
        alignItems: 'center',
        paddingTop: 100,
    },
    image: {
        width: 129,
        height: 129,
    },
    formView: {
        alignItems: "center",
        paddingBottom: 20
    },
    btnView: {
        paddingTop: 10,
        paddingBottom: 10,

    },
    btnStyle: {
        height: 40,
        width: width - 120,
        borderWidth: 1,
        borderColor: "black",
    },
    btnSignInColor: {
        backgroundColor: "#00C22A"
    },
    btnFacebookColor: {
        backgroundColor: "#0243D0"
    },
    btnGoogleColor: {
        backgroundColor: "#F20900"
    },
    btnTxtStyle: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
    }
});