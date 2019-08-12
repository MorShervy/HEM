import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Month from "../components/Month";

const Home = props => {
  const [getSelectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1
  );

  const HandleClickMonth = month => {
    setSelectedMonth(month);
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flex: 0.1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontWeight: "bold" }}>0</Text>
      </View>

      <View style={{ flex: 0.2 }}>
        <Month HandleClickMonth={HandleClickMonth} />
      </View>

      <View style={{ flex: 0.7, justifyContent: "flex-end" }}>
        <TouchableOpacity>
          <Text>hey</Text>
        </TouchableOpacity>
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
