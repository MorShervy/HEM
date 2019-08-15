import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  AsyncStorage
} from "react-native";
import MonthList from "../components/MonthList";
import { MonthData } from "../data/MonthData";

const { width, height } = Dimensions.get("window");

const Home = props => {
  const [getSelectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1
  );
  const [getSelectedMonthCanExpend, setSelectedMonthCanExpend] = useState(0);
  const [getSalaryOfMonth, setSalaryOfMonth] = useState(0);
  const [getExpensesOfMonth, setExpensesOfMonth] = useState(0);
  const [getAllIncomesAndExpenses, setAllIncomesAndExpenses] = useState(0);
  const [getSalaryModal, setSalaryModal] = useState(false);

  useEffect(() => {
    // change the salary to the selected month
    AsyncStorage.getItem(getSelectedMonth.toString())
      .then(res => JSON.parse(res))
      .then(res =>
        res !== null
          ? setSelectedMonthCanExpend(
              parseFloat(res.salary - res.expend).toFixed(2)
            )
          : setSelectedMonthCanExpend(0)
      );
  }, [getSelectedMonth]);

  const HandleClickMonth = async month => {
    setSelectedMonth(month);
    const incomes = props.navigation.getParam("incomes");
    const expenses = props.navigation.getParam("expenses");

    const incomesFiltered = incomes.filter(res => res.Month === month);
    const expensesFiltered = expenses.filter(res => res.Month === month);

    setSalaryOfMonth(incomesFiltered);
    setExpensesOfMonth(expensesFiltered);
    setAllIncomesAndExpenses(incomesFiltered.concat(expensesFiltered));
    console.log("getAllIncomesAndExpenses: ", getAllIncomesAndExpenses);
  };

  const HandleAddSalary = () => {
    //setSalaryModal(true);
    AsyncStorage.getItem(getSelectedMonth.toString())
      .then(res => JSON.parse(res))
      .then(res => {
        AsyncStorage.setItem(
          getSelectedMonth.toString(),
          JSON.stringify({
            salary: 20000,
            expend: res !== null ? parseFloat(res.expend) : 0
          })
        ).then(
          res !== null
            ? setSelectedMonthCanExpend(
                parseFloat(res.salary - res.expend).toFixed(2)
              )
            : setSelectedMonthCanExpend(2000)
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
        ).then(
          res !== null
            ? setSelectedMonthCanExpend(
                parseFloat(res.salary - res.expend).toFixed(2)
              )
            : setSelectedMonthCanExpend(-5000)
        );
      });
  };

  // for (let index = 1; index <= 12; index++) {
  //   AsyncStorage.removeItem(index.toString());
  // }

  return (
    <View style={styles.container}>
      <View style={styles.selectedMonthPosition}>
        <Text>{`at ${
          MonthData.find(month => month.key === getSelectedMonth).value
        }`}</Text>
        <Text>you can expend</Text>
        <Text
          style={[
            styles.canExpend,
            {
              color: (getSelectedMonthCanExpend <= 0 && "red") || "green"
            }
          ]}
        >
          {getSelectedMonthCanExpend}
        </Text>
      </View>

      <View style={styles.graphFilledPosition}>
        <MonthList
          HandleClickMonth={HandleClickMonth}
          getSelectedMonth={getSelectedMonth}
          getSelectedMonthCanExpend={getSelectedMonthCanExpend}
        />
      </View>
      <View style={styles.DetailsPosition}>
        <FlatList
          style={styles.flatList}
          data={MonthData}
          renderItem={({ item }) => (
            <View>
              <Text>asd</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          extraData={props}
        />
        {/* <Click text="Add" onPress={HandleAddSalary} />
        <Click text="Remove" onPress={HandleExpendSalary} />
        <Click text="Edit" />
        <Click text="Bamba" />
        <Click text="Bisli" />
        <Click text="Tapo chips" /> */}
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
  container: { flex: 1 },
  selectedMonthPosition: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  canExpend: { fontWeight: "bold" },
  graphFilledPosition: { flex: 0.2 },
  DetailsPosition: { flex: 0.6 },
  flatList: { flex: 1, width: width }
});
