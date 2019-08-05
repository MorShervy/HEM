import React from "react";
import Logo from "../components/Logo";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");

const SignUp = props => (
    <View style={styles.container}>
        <Logo styles={[styles.logo, styles.image]} />

        <View style={styles.formView}>
            <View style={{ paddingTop: 10 }}>
                <Text style={styles.txtBold}>Sign Un to HEM</Text>
            </View>
            <View style={{ paddingTop: 10 }}>
                <TextInput style={styles.txtInput} placeholder="Example@example.com" />
            </View>
            <View style={{ paddingTop: 10 }}>
                <TextInput style={styles.txtInput} placeholder="Password" />
            </View>
            <View style={{ paddingTop: 10 }}>
                <TextInput style={styles.txtInput} placeholder="Confirm Password" />
            </View>
            {/* button sign in */}
            <View style={{ paddingTop: 10 }}>
                <TouchableOpacity style={[styles.btnStyle, styles.btnSignInColor]}>
                    <Text style={styles.btnTxtStyle}>Sign Un</Text>
                </TouchableOpacity>
            </View>

            <View style={{ paddingTop: 50 }}>
                <Text>Have account in H.E.M?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate("SignIn")}>
                    <Text style={styles.btnSignIn}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);
export default SignUp;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
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
        alignItems: "center",
        paddingTop: 100
    },
    image: {
        width: 129,
        height: 129
    },
    formView: {
        alignItems: "center",
        paddingBottom: 20
    },
    btnStyle: {
        height: 40,
        width: width - 120,
        borderWidth: 1,
        borderColor: "black"
    },
    btnSignInColor: {
        backgroundColor: "#00C22A"
    },
    btnTxtStyle: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center"
    },
    btnSignIn: {
        color: "#00C22A"
    }
});
