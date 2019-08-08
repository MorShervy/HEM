import React from "react";
import { StyleSheet, Text, View, I18nManager } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import AuthNav from "./AuthNav";
import HomeNav from './HomeNav';


I18nManager.forceRTL(false);

function App() {
  activateKeepAwake();
  return (
    <View style={styles.container}>
      <AppNav />
    </View>
  );
}

const AppNav = createStackNavigator(
  {
    AuthNav,
    HomeNav
  },
);

export default createAppContainer(AppNav);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
