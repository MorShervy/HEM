import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  TouchableOpacity,
  AsyncStorage,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Logo from "../components/Logo";

import SignInWIthFB from "../handlers/SignInWIthFB";
import SignInWithGL from "../handlers/SignInWithGL";
import SQL from "../handlers/SQL";
import RefreshDataFromDBToAsyncStorage from '../handlers/RefreshDataFromDBToAsyncStorage'

const { width, height } = Dimensions.get("window");
const regexEmail = /^(([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}))$/;
const regexPassword = /^(.{6,12})$/;

export default function SignIn(props) {
  const [getLoading, setLoading] = useState(false);
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getErrLogin, setErrLogin] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then(res => JSON.parse(res))
      .then(res => {
        res !== null && GetUserDetailsFromDB(res);
      });
  }, []);

  const GetUserDetailsFromDB = async user => {
    setLoading(true);
    const result = await RefreshDataFromDBToAsyncStorage.GetUserDetailsFromDB(user)
    setLoading(false);
    await props.navigation.replace("HomeNav", {
      incomes: result.incomes,
      expenses: result.expenses
    });
  };

  const SaveToAsyncStorage = async (email, name, url) => {
    const res = await RefreshDataFromDBToAsyncStorage.SaveToAsyncStorage(email, name, url)
    successAuth(res);

  };

  const _HandleLoginWithGoogle = async () => {
    setLoading(true);
    const { type, accessToken, user } = await SignInWithGL.Login();
    if (user != undefined) {
      SaveToAsyncStorage(user.email, user.name, user.photoUrl);
    }
  };

  const _HandleLoginWithFacebook = async () => {
    setLoading(true);
    const user = await SignInWIthFB.Login();
    //console.log("user=", user);
    if (user != undefined) {
      SaveToAsyncStorage(user.email, user.name, user.picture.data.url);
    }
  };

  const successAuth = res => {
    setErrLogin(false);
    setEmail("");
    setPassword("");
    GetUserDetailsFromDB({ accountID: res.AccountID });
    //props.navigation.replace("HomeNav");
  };

  const _HandleLogin = async () => {
    setLoading(true);
    if (
      regexEmail.test(getEmail.toUpperCase()) &&
      regexPassword.test(getPassword.toUpperCase())
    ) {
      //console.log(getEmail, getPassword);
      SQL.Login(getEmail, getPassword).then(res => {
        //console.log("res=", res);
        (res.error === undefined &&
          AsyncStorage.setItem(
            "user",
            JSON.stringify({
              accountID: res.AccountID,
              email: res.Email,
              name: res.Name,
              url: res.PhotoUrl
            })
          ).then(successAuth(res))) ||
          setErrLogin(true);
      });
      return;
    }

    setErrLogin(true);
  };

  return (
    <View style={styles.container}>
      {getLoading && (
        <ActivityIndicator
          style={{ flex: 1, paddingTop: 150, position: "absolute", marginLeft: width / 2 }}
          size={50} />
      )}
      <Logo styles={[styles.logo, styles.image]} />

      <View style={styles.formView}>
        <View style={{ paddingTop: 10 }}>
          <Text style={styles.txtBold}>Sign In to HEM</Text>
        </View>
        <View style={{ paddingTop: 10, width: width - 120, height: 30 }}>
          {getErrLogin && (
            <TouchableOpacity
              style={{ justifyContent: "space-evenly", flexDirection: "row" }}
              onPress={() => setErrLogin(false)}
            >
              <Text style={{ fontSize: 12, color: "red" }}>
                Incorrect username or password
              </Text>
              <Ionicons name="ios-close" size={25} color="red" />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ paddingTop: 10 }}>
          <TextInput
            style={styles.txtInput}
            placeholder="Example@example.com"
            value={getEmail}
            keyboardType="email-address"
            onChangeText={e => setEmail(e)}
          />
        </View>
        <View style={{ paddingTop: 10 }}>
          <TextInput
            style={styles.txtInput}
            placeholder="Password"
            maxLength={12}
            secureTextEntry={true}
            value={getPassword}
            onChangeText={e => setPassword(e)}
          />
        </View>

        {/* button sign in */}
        <View style={{ paddingTop: 25 }}>
          <TouchableOpacity
            style={[styles.btnStyle, styles.btnSignInColor]}
            onPress={_HandleLogin}
          >
            <Text style={styles.btnTxtStyle}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* button sign in facebook */}
        <View style={{ paddingTop: 70 }}>
          <TouchableOpacity
            onPress={_HandleLoginWithFacebook}
            style={[styles.btnStyle, styles.btnFacebookColor]}
          >
            <Text style={styles.btnTxtStyle}>Sign In with Facebook</Text>
          </TouchableOpacity>
        </View>
        {/* button sign in google */}
        <View style={{ paddingTop: 10 }}>
          <TouchableOpacity
            style={[styles.btnStyle, styles.btnGoogleColor]}
            onPress={_HandleLoginWithGoogle}
          >
            <Text style={styles.btnTxtStyle}>Sign In with Google</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingTop: 50, flexDirection: "row" }}>
        <Text>New to H.E.M? </Text>
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
    paddingTop: 30
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
  },
  btnView: {
    borderColor: "#000000"
  }
});
