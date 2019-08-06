import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import Logo from "../components/Logo";
import * as Expo from "expo";

import SignInWithGL from '../test/SignInWithGL';

const { width, height } = Dimensions.get("window");
const fbId = "415744562619529";

export default function SignIn(props) {

  const _HanleLoginWithGoogle = async () => {
    //alert("_HanleLoginWithGoogle")
    const user = await SignInWithGL.Login();
    console.log("user=", user)
  }

  const loginFB = async () => {
    try {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        fbId,
        {
          permissions: ["public_profile", "email"]
        }
      );
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?fields=email,name,picture.type(large)&access_token=${token}`
        );
        //Alert.alert("Logged in!", `Hi ${await response.json()}!`);
        console.log(await response.json());
      } else {
        // type === 'cancel'
        Alert.alert(type);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Logo styles={[styles.logo, styles.image]} />

      <View style={styles.formView}>
        <View style={{ paddingTop: 10 }}>
          <Text style={styles.txtBold}>Sign In to HEM</Text>
        </View>
        <View style={{ paddingTop: 10 }}>
          <TextInput
            style={styles.txtInput}
            placeholder="Example@example.com"
          />
        </View>
        <View style={{ paddingTop: 10 }}>
          <TextInput style={styles.txtInput} placeholder="Password" />
        </View>
        {/* button sign in */}
        <View style={{ paddingTop: 10 }}>
          <TouchableOpacity style={[styles.btnStyle, styles.btnSignInColor]}>
            <Text style={styles.btnTxtStyle}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* button sign in facebook */}
        <View style={{ paddingTop: 50 }}>
          <TouchableOpacity
            onPress={loginFB}
            style={[styles.btnStyle, styles.btnFacebookColor]}
          >
            <Text style={styles.btnTxtStyle}>Sign In with Facebook</Text>
          </TouchableOpacity>
        </View>
        {/* butto sign in google */}
        <View style={{ paddingTop: 10 }}>
          <TouchableOpacity
            style={[styles.btnStyle, styles.btnGoogleColor]}
            onPress={() => _HanleLoginWithGoogle()}
          >
            <Text style={styles.btnTxtStyle}>Sign In with Google</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingTop: 50 }}>
        <Text>New to H.E.M?</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.btnSignUp}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    borderWidth: 1
  },
  btnSignInColor: {
    backgroundColor: "#2cb54b",
    borderColor: "#289643"
  },
  btnFacebookColor: {
    backgroundColor: "#415dae",
    borderColor: "#415dae"
  },
  btnGoogleColor: {
    backgroundColor: "#cf4332",
    borderColor: "#cf4332"
  },
  btnTxtStyle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center"
  },
  btnSignUp: {
    color: "#00C22A"
  }
});
