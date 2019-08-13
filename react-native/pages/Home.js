import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";
import Month from "../components/Month";

const Home = props => {
  const [getSelectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1
  );
  const [getSelectedMonthSalary, setSelectedMonthSalary] = useState(0);

  useEffect(() => {
    // change the salary to the selected month
    AsyncStorage.getItem(getSelectedMonth.toString())
      .then(res => JSON.parse(res))
      .then(res =>
        res !== null
          ? setSelectedMonthSalary(res.salary)
          : setSelectedMonthSalary(0)
      );
  }, [getSelectedMonth]);

  const HandleClickMonth = month => {
    setSelectedMonth(month);
  };

  const HandleAddSalary = () => {
    AsyncStorage.getItem(getSelectedMonth.toString())
      .then(res => JSON.parse(res))
      .then(res => {
        AsyncStorage.setItem(
          getSelectedMonth.toString(),
          JSON.stringify({
            salary: 20000,
            expend: res !== null ? parseFloat(res.expend) : 0
          })
        );
      });
  };

  const HandleExpendSalary = () => {
    AsyncStorage.getItem(getSelectedMonth.toString())
      .then(res => JSON.parse(res))
      .then(res => {
        AsyncStorage.setItem(
          getSelectedMonth.toString(),
          JSON.stringify({
            salary: res !== null ? parseFloat(res.salary) : 0,
            expend: res !== null ? parseFloat(res.expend) + 5000 : 5000
          })
        );
      });
  };
  //AsyncStorage.removeItem("8");
  return (
    <View style={styles.container}>
      <View
        style={{ flex: 0.1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontWeight: "bold" }}>{getSelectedMonthSalary}</Text>
      </View>

      <View style={{ flex: 0.2 }}>
        <Month HandleClickMonth={HandleClickMonth} />
      </View>
      <View
        style={{
          flex: 0.6,
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap"
        }}
      >
        <Click text="Add" onPress={() => HandleAddSalary()} />
        <Click text="Remove" onPress={() => HandleExpendSalary()} />
        <Click text="Edit" />
        <Click text="Bamba" />
        <Click text="Bisli" />
        <Click text="Tapo chips" />
      </View>
    </View>
  );
};
export default Home;

export const Click = props => (
  <TouchableOpacity
    style={{
      width: "30%",
      height: "20%",
      marginVertical: "5%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      shadowOpacity: 1,
      shadowColor: "rgba(0,0,0,0.15)",
      shadowRadius: 5,
      elevation: 15
    }}
    onPress={props.onPress}
  >
    <View>
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
