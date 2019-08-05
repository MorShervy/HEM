import React, { Component } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Dimensions, TextInput, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("window");

export default function SignIn() {

    return (
        <View style={styles.container}>

            {/* <Logo /> */}

            <Text style={styles.txtBold}>House Expenses Management</Text>
            <Text style={styles.txtBold}>Sign In to HEM</Text>

            <TextInput style={styles.txtInput}
                placeholder="Example@example.com"
            />

            <TextInput style={styles.txtInput}
                placeholder="Password"
            />

            <TouchableOpacity >
                <Text>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    txtBold: {
        fontSize: 18,
        fontWeight: "bold"
    },
    txtInput: {
        width: width - 120,
        height: 30,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "black"
    }
});