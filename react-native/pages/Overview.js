import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Overview = props => {
  return (
    <View style={styles.container}>
      <Text>Overview</Text>
    </View>
  );
};
export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
