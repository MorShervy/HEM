import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  TouchableOpacity
} from "react-native";
import Logo from "../components/Logo";

import SignInWIthFB from "../handlers/SignInWIthFB";
import SignInWithGL from '../handlers/SignInWithGL';
import SQL from '../handlers/SQL';

const { width, height } = Dimensions.get("window");

export default function SignIn(props) {

  const _HanleLoginWithGoogle = async () => {
    //alert("_HanleLoginWithGoogle")
    const { type, accessToken, user } = await SignInWithGL.Login();
    console.log("type=", type)
    console.log("accessToken=", accessToken)
    console.log("user=", user)
    SQL.InsertUserFBandGL(user.email, user.name, user.photoUrl).then((res) => { console.log("res=", res); });
    
  }

  const _HanleLoginWithFacebook = async () => {
    const user = await SignInWIthFB.Login();
    console.log("user=", user)
    SQL.InsertUserFBandGL(user.email, user.name, user.picture.data.url).then((res) => { console.log("res=", res); });

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
            onPress={() => _HanleLoginWithFacebook()}
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
