import * as Facebook from "expo-facebook";
import { Alert } from "react-native";

export default class SignInWithFB {

  static async Login() {
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
        //Alert.alert("Logged in!", `Hi ${await response.json()}!`);
        return await response.json()
      } else {
        // type === 'cancel'
        return;
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      return;
    }
  }
}
