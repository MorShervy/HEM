import * as Facebook from "expo-facebook";
import { Alert } from "react-native";

export const SignInWIthFB = async () => {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "415744562619529",
      {
        permissions: ["public_profile", "email"]
      }
    );
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?fields=email,name,picture.type(large)&access_token=${token}`
      );
      return await response.json();
    }
  } catch ({ message }) {
    Alert.alert(`Facebook Login Error: ${message}`);
  }
};
