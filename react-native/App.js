import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  I18nManager,
  Image,
  AsyncStorage
} from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { useKeepAwake } from 'expo-keep-awake';
import AuthNav from "./AuthNav";
import HomeNav from "./HomeNav";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Logo from "./components/Logo";
import MyProfile from "./pages/MyProfile";

I18nManager.forceRTL(false);

const RootStack = createStackNavigator(
  {
    AuthNav,
    HomeNav
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          disabled={navigation.state.routeName === "AuthNav"}
        >
          <Ionicons name="md-menu" size={50} style={styles.icon} />
        </TouchableOpacity>
      ),
      headerRight: <Logo styles={[styles.viewImg, styles.img]} />,
      headerStyle: {
        backgroundColor: "#2C3E50"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    })
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };

  }


  render() {
    componentWillMount = () => {
      useKeepAwake();
    }
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 20,
    color: "#fff"
  },
  img: {
    width: 40,
    height: 40
  },
  viewImg: {
    paddingEnd: 15
  }
});
