import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import SQL from "../handlers/SQL";

const { width, height } = Dimensions.get("window");
const regexEmail = /^(([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}))$/;
const regexPassword = /^(.{6,12})$/;

const SignUp = props => {
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getCPassword, setCPassword] = useState("");
  const [getIndicator, setIndicator] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("user").then(
      res => res !== null && props.navigation.replace("HomeNav")
    );
  }, []);

  const HandleSignUp = () => {
    setIndicator(true);
    //SQL.GetIncomeUserByYear(1000, '2019-02-02').then(res => console.log("res=", res))
    if (
      regexEmail.test(getEmail.toUpperCase()) &&
      regexPassword.test(getPassword.toUpperCase()) &&
      regexPassword.test(getCPassword.toUpperCase())
    ) {
      SQL.InsertUser(getEmail, getPassword).then(res => {

        (res.res === "0" &&
          AsyncStorage.setItem(
            "user",
            JSON.stringify({ email: getEmail })
          ).then(props.navigation.replace("HomeNav"))) ||
          (res.res === "1" && Alert.alert("Email already exist")) ||
          (res.res === "-1" && Alert.alert("There is problem with the server"));
      });
    }

    setIndicator(false);
  };

  return (
    <View style={styles.container}>
      {getIndicator && (
        <ActivityIndicator
          size={77}
          color="#0000ff"
          style={{
            position: "absolute"
          }}
        />
      )}
      <Logo styles={[styles.logo, styles.image]} />

      <View style={styles.formView}>
        <View style={{ paddingTop: 10 }}>
          <Text style={styles.txtBold}>Sign Up to HEM</Text>
        </View>
        <View style={{ paddingTop: 10 }}>
          <TextInput
            style={[
              styles.txtInput,
              {
                borderColor:
                  (getEmail === "" && "black") ||
                  (!regexEmail.test(getEmail.toUpperCase()) && "red") ||
                  "green"
              }
            ]}
            placeholder="Example@example.com"
            value={getEmail}
            onChangeText={e => setEmail(e)}
          />
        </View>
        <View style={{ paddingTop: 5, width: width - 120 }}>
          <Text style={{ fontSize: 11, color: "#bcb2a7" }}>
            {((getEmail === "" || regexEmail.test(getEmail.toUpperCase())) &&
              "We’ll occasionally send updates about your account to this inbox." +
              "We’ll never share your email address with anyone.") ||
              "Email is invalid or already taken"}
          </Text>
        </View>
        <View style={{ paddingTop: 10 }}>
          <TextInput
            style={[
              styles.txtInput,
              {
                borderColor:
                  (getPassword === "" && "black") ||
                  (!regexPassword.test(getPassword.toUpperCase()) && "red") ||
                  "green"
              }
            ]}
            placeholder="Password"
            maxLength={12}
            secureTextEntry={true}
            value={getPassword}
            onChangeText={e => setPassword(e)}
          />
        </View>
        <View
          style={{ flexDirection: "row", paddingTop: 5, width: width - 120 }}
        >
          <Text style={{ fontSize: 11, color: "#bcb2a7" }}>
            Make sure it's
            <Text
              style={{
                fontSize: 11,
                color:
                  (getPassword === "" && "#bcb2a7") ||
                  (getPassword.length < 6 && "red") ||
                  "green"
              }}
            >
              {" "}
              at least 6 characters
            </Text>
            <Text style={{ fontSize: 11, color: "#bcb2a7" }}>
              {" "}
              and not longer than 12 characters including a number.
            </Text>
          </Text>
        </View>
        <View style={{ paddingTop: 10 }}>
          <TextInput
            style={[
              styles.txtInput,
              {
                borderColor:
                  (getCPassword === "" && "black") ||
                  ((!regexPassword.test(getCPassword.toUpperCase()) ||
                    getCPassword !== getPassword) &&
                    "red") ||
                  "green"
              }
            ]}
            placeholder="Confirm Password"
            maxLength={12}
            secureTextEntry={true}
            value={getCPassword}
            onChangeText={e => setCPassword(e)}
          />
        </View>

        {/* button sign in */}
        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity
            style={[styles.btnStyle, styles.btnSignInColor]}
            onPress={HandleSignUp}
          >
            <Text style={styles.btnTxtStyle}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 50, flexDirection: "row" }}>
          <Text>Have account in H.E.M? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("SignIn")}>
            <Text style={styles.btnSignIn}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
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
    paddingTop: 20
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
