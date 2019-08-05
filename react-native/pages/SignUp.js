import React from "react";
import Logo from "../components/Logo";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const SignUp = props => (
  <View style={styles.container}>
    <Logo styles={[]} />

    <Text style={styles.txtBold}>House Expenses Management</Text>
    <Text style={styles.txtBold}>Sign Up to HEM</Text>

    <TextInput style={styles.txtInput} placeholder="Example@example.com" />

    <TextInput style={styles.txtInput} placeholder="Password" />

    <TouchableOpacity>
      <Text>Sign Up</Text>
    </TouchableOpacity>
  </View>
);
export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
});
