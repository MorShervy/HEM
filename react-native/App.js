import React from "react";
import { StyleSheet, Text, View, I18nManager } from "react-native";
import { createStackNavigator, createAppContainer } from 'react-navigation';

import SignIn from './pages/SignIn';

I18nManager.forceRTL(false);

function App() {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const AppNavigator = createStackNavigator({

  SignIn,

},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisable: false,
    }
  },
  {
    initialRouteName: 'SignIn',
  });

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
