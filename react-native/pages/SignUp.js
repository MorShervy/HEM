import React, { useState } from "react";
import Logo from "../components/Logo";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator
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

  const HandleSignUp = () => {
    setIndicator(true);
    if (
      regexEmail.test(getEmail.toUpperCase()) &&
      regexPassword.test(getPassword.toUpperCase()) &&
      regexPassword.test(getCPassword.toUpperCase())
    ) {
      SQL.InsertUser(getEmail, getPassword).then(res => {
        (res.res === "0" && props.navigation.navigate("Overview")) ||
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
        <View style={{ paddingTop: 10 }}>
          <TouchableOpacity
            style={[styles.btnStyle, styles.btnSignInColor]}
            onPress={HandleSignUp}
          >
            <Text style={styles.btnTxtStyle}>Sign Up</Text>
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
