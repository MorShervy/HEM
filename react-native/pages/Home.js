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
import { Ionicons, Octicons } from "@expo/vector-icons";
import AddIncomeModal from "../components/AddIncomeModal";
import ExpendList from "../components/ExpendList";

const { width, height } = Dimensions.get("window");

const Home = props => {
  const [getSelectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1
  );
  const [getSelectedMonthCanExpend, setSelectedMonthCanExpend] = useState(0);
  const [getSalaryOfMonth, setSalaryOfMonth] = useState(0);
  const [getExpensesOfMonth, setExpensesOfMonth] = useState(0);

  const [toggleAdding, setToggleAdding] = useState(false);
  const [expensesModal, setExpensesModal] = useState(false);
  const [incomeModal, setIncomeModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    //AsyncStorage.getItem("user").then(res => JSON.parse(res)).then(res => setUser(res))
    // change the salary to the selected month
    AsyncStorage.getItem(getSelectedMonth.toString())
      .then(res => JSON.parse(res))
      .then(res => {
        res !== null
          ? setSelectedMonthCanExpend(
              parseFloat(res.salary - res.expend).toFixed(2)
            )
          : setSelectedMonthCanExpend(0);
      });
    HandleGetIncomeAndExpensesFromAsyncStoreg(getSelectedMonth);
  }, [getSelectedMonth]);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then(res => JSON.parse(res))
      .then(res => setUser(res));
  }, []);

  const HandleClickMonth = async month => {
    setSelectedMonth(month);
  };

  const HandleGetIncomeAndExpensesFromAsyncStoreg = month => {
    const incomes = props.navigation.getParam("incomes");
    const expenses = props.navigation.getParam("expenses");

    const incomesFiltered = incomes.filter(res => res.Month === month);
    const expensesFiltered = expenses.filter(res => res.Month === month);

    setSalaryOfMonth(incomesFiltered);
    setExpensesOfMonth(expensesFiltered);
  };

  const ToggleAdding = () => {
    setToggleAdding(!toggleAdding);
  };

  const handleAddIncomeModal = () => {
    setIncomeModal(true);
  };

  const renderAddingIncome = () => (
    <View
      style={{
        flexDirection: "row",
        marginTop: "62%",
        position: "absolute",
        marginLeft: "52%"
      }}
    >
      <View style={{ paddingTop: 10 }}>
        <View style={styles.txtView}>
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
              color: "#fff",
              marginRight: 15
            }}
          >
            Income
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.btnAdd, { backgroundColor: "#07D60D" }]}
        onPress={handleAddIncomeModal}
      >
        <Ionicons
          name="ios-add"
          size={30}
          color="#fff"
          style={{ textAlign: "center", marginTop: 15 }}
        />
      </TouchableOpacity>
    </View>
  );

  const renderAddingExpenses = () => (
    <View
      style={{
        flexDirection: "row",
        marginTop: "80%",
        position: "absolute",
        marginLeft: "52%"
      }}
    >
      <View style={{ paddingTop: 10 }}>
        <View style={styles.txtView}>
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
              color: "#fff",
              marginRight: 15
            }}
          >
            Expenses
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.btnAdd, { backgroundColor: "#FF0000" }]}
        onPress={() => setExpensesModal(true)}
      >
        <Ionicons
          name="ios-add"
          size={30}
          color="#fff"
          style={{ textAlign: "center", marginTop: 15 }}
        />
      </TouchableOpacity>
    </View>
  );

  const AddExpensesModal = () => (
    <Modal
      style={{ flex: 1 }}
      animationType="slide"
      transparent={false}
      visible={expensesModal}
      onRequestClose={() => {
        setExpensesModal(false);
      }}
    />
  );

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
          getSelectedMonthCanExpend={getSelectedMonthCanExpend}
        />
      </View>
      <View style={styles.expendDetailsPosition}>
        <ExpendList getExpensesOfMonth={getExpensesOfMonth} />

        {(toggleAdding && renderAddingIncome()) || null}
        {(toggleAdding && renderAddingExpenses()) || null}
        <View
          style={{ marginTop: "98%", position: "absolute", marginLeft: "80%" }}
        >
          <TouchableOpacity style={styles.btnAdd} onPress={ToggleAdding}>
            {!toggleAdding ? (
              <Ionicons
                name="ios-add"
                size={30}
                color="#fff"
                style={{ textAlign: "center", marginTop: 15 }}
              />
            ) : (
              <Octicons
                style={{ textAlign: "center", marginTop: 15 }}
                name="kebab-horizontal"
                size={30}
                color="white"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <AddIncomeModal
        openIncomeModal={incomeModal}
        closeIncomeModal={() => setIncomeModal(false)}
        user={user}
      />
      <AddExpensesModal
        openExpensesModal={expensesModal}
        closeExpensesModal={() => setExpensesModal(false)}
      />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: { flex: 1 },
  selectedMonthPosition: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  canExpend: { fontWeight: "bold" },
  graphFilledPosition: { flex: 0.2 },
  expendDetailsPosition: {
    flex: 0.6
  },

  btnAdd: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2 + 60 / (8 + 14.8), // get radius

    backgroundColor: "#2D60FF",
    shadowOpacity: 1,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowRadius: 5,
    elevation: 15
  },
  txtView: {
    width: 115,
    height: 40,
    backgroundColor: "#000000BA",
    borderRadius: 7
  }
});
