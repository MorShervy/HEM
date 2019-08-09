import React, { Component } from "react";
import { StyleSheet, Text, View, I18nManager, Image } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import AuthNav from "./AuthNav";
import HomeNav from './HomeNav';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Logo from './components/Logo';

I18nManager.forceRTL(false);

const stackNavigatorConfigAuthNav = () => {

  return (
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisable: false,
      }
    }
  )
}









const RootStack = createStackNavigator(
  {
    AuthNav,
    HomeNav
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({

      headerLeft: (
        <TouchableOpacity
          onPress={() => console.log(navigation.state.routeName === "HomeNav")} //navigation.toggleDrawer()
          disabled={navigation.state.routeName === "AuthNav"}

        >
          <Ionicons name="md-menu" size={50} style={styles.icon}></Ionicons>
        </TouchableOpacity >
      ),
      headerRight: (
        <Logo styles={[styles.viewImg, styles.img]} />
      ),
      headerStyle: {
        backgroundColor: '#2C3E50',
      },
      headerTitleStyle: {
        color: "#fff",
      }
    })
  }


);


const AppContainer = createAppContainer(RootStack)

export default class App extends Component {


  render() {

    activateKeepAwake();

    return (
      <AppContainer />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    paddingHorizontal: 20,
    color: "#fff",
  },
  img: {
    width: 40,
    height: 40,
  },
  viewImg: {
    paddingEnd: 15
  }
});
