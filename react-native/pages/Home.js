import React from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Month from "../components/Month";

const Home = props => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.2 }}>
        <Month />
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
