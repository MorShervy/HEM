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
import AddExpensesModal from "../components/AddExpensesModal";

const { width, height, fontScale } = Dimensions.get("window");

const Home = props => {
  const [getSelectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1
  );
  const [getSalaryOfAllYears, setSalaryOfAllYears] = useState(
    props.navigation.getParam("incomes")
  );
  const [getExpensesOfAllYears, setExpensesOfAllYears] = useState(
    props.navigation.getParam("expenses")
  );
  const [getSalaryOfMonth, setSalaryOfMonth] = useState(null);
  const [getExpensesOfMonth, setExpensesOfMonth] = useState(null);

  const [getIncomeSum, setIncomeSum] = useState(0);
  const [getExpendSum, setExpendSum] = useState(0);

  const [toggleAdding, setToggleAdding] = useState(false);
  const [expensesModal, setExpensesModal] = useState(false);
  const [incomeModal, setIncomeModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    HandleGetIncomeAndExpensesFromAsyncStoreg(getSelectedMonth);
  }, [getSelectedMonth]);

  useEffect(() => {
    IncomeSum();
    ExpendSum();
  }, [getSalaryOfMonth, getExpensesOfMonth]);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then(res => JSON.parse(res))
      .then(res => setUser(res));

    for (let index = 1; index <= 12; index++) {
      let income = 0;
      let expend = 0;
      getSalaryOfAllYears !== null &&
        getSalaryOfAllYears !== undefined &&
        getSalaryOfAllYears
          .filter(res => res.Month === index)
          .map(res => (income += parseFloat(res.Amount)));
      getExpensesOfAllYears !== null &&
        getExpensesOfAllYears !== undefined &&
        getExpensesOfAllYears
          .filter(res => res.Month === index)
          .map(res => (expend += parseFloat(res.Amount)));
      AsyncStorage.setItem(
        index.toString(),
        JSON.stringify({
          salary: income,
          expend: expend
        })
      );
    }
  }, []);

  const HandleClickMonth = month => {
    setSelectedMonth(month);
  };

  const HandleGetIncomeAndExpensesFromAsyncStoreg = month => {
    const incomesFiltered =
      (getSalaryOfAllYears !== null &&
        getSalaryOfAllYears !== undefined &&
        getSalaryOfAllYears.filter(res => res.Month === month)) ||
      [];
    const expensesFiltered =
      (getExpensesOfAllYears !== null &&
        getExpensesOfAllYears !== undefined &&
        getExpensesOfAllYears.filter(res => res.Month === month)) ||
      [];

    console.log("shit append");
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
            Expense
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

  // const AddExpensesModal = () => (
  //   <Modal
  //     style={{ flex: 1 }}
  //     animationType="slide"
  //     transparent={false}
  //     visible={expensesModal}
  //     onRequestClose={() => {
  //       setExpensesModal(false);
  //     }}
  //   />
  // );

  const HandleAddSalary = details => {
    // "AccountID": 1027,
    // "Amount": 14500,
    // "Date": null,
    // "Month": 5,
    // "Type": "work",
    // "Year": 2019,

    AsyncStorage.setItem(
      details.Month.toString(),
      JSON.stringify({
        salary: getIncomeSum + details.Amount,
        expend: getExpendSum
      })
    );
    setIncomeSum(getIncomeSum + details.Amount);
    setSalaryOfAllYears(getSalaryOfAllYears.concat(details));
  };

  const HandleExpendSalary = async details => {
    // "AccountID": 1027,
    // "Amount": 8000,
    // "CategoryID": 2,
    // "Date": null,
    // "Day": 12,
    // "Info": "bisli",
    // "Month": 2,
    // "Time": "12:12:00",
    // "Year": 2019,

    getSelectedMonth !== details.Month && setSelectedMonth(details.Month);
    AsyncStorage.setItem(
      details.Month.toString(),
      JSON.stringify({
        salary: getIncomeSum,
        expend: getExpendSum + details.Amount
      })
    );
    setExpendSum(getExpendSum + details.Amount);
    setExpensesOfAllYears(getExpensesOfAllYears.concat(details));
    setExpensesOfMonth(getExpensesOfMonth.concat(details));
  };

  const IncomeSum = () => {
    let income = 0;
    getSalaryOfMonth !== null &&
      getSalaryOfMonth.map(res => (income += parseFloat(res.Amount)));
    setIncomeSum(income);
  };

  const ExpendSum = () => {
    let expend = 0;
    getExpensesOfMonth !== null &&
      getExpensesOfMonth.map(res => (expend += parseFloat(res.Amount)));
    setExpendSum(expend);
  };

  const HandleDeleteExpense = item => {
    AsyncStorage.setItem(
      item.Month.toString(),
      JSON.stringify({
        salary: getIncomeSum,
        expend: getExpendSum - item.Amount
      })
    );
    setExpendSum(getExpendSum - item.Amount);
    setExpensesOfAllYears(getExpensesOfAllYears.filter(res => res !== item));
    setExpensesOfMonth(getExpensesOfMonth.filter(res => res !== item));
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectedMonthPosition}>
        <Text style={[styles.headerText, styles.headerSelectedMonth]}>
          {`in\n${
            MonthData.find(month => month.key === getSelectedMonth).value
          }`}
        </Text>

        <Text style={[styles.headerText, styles.headerSalaryAndExpend]}>
          {`Salary\n${getIncomeSum}$`}
        </Text>
        <Text style={[styles.headerText, styles.headerSalaryAndExpend]}>
          {`Can Expend\n${(getIncomeSum - getExpendSum).toFixed(2)}$`}
        </Text>
      </View>

      <View style={styles.graphFilledPosition}>
        <MonthList
          HandleClickMonth={HandleClickMonth}
          getCanExpend={getIncomeSum - getExpendSum}
        />
      </View>

      <View style={styles.expendDetailsPosition}>
        <ExpendList
          getExpensesOfMonth={getExpensesOfMonth}
          getExpensesOfAllYears={getExpensesOfAllYears}
          HandleDeleteExpense={HandleDeleteExpense}
        />

        {/** start checking  */}
        <TouchableOpacity
          onPress={() =>
            HandleAddSalary({
              AccountID: 1027,
              Amount: 14500,
              Date: null,
              Month: 5,
              Type: "work",
              Year: 2019
            })
          }
        >
          <Text>Click to add salary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            HandleExpendSalary({
              AccountID: 1027,
              Amount: 1000,
              CategoryID: 2,
              Date: null,
              Day: 12,
              Info: "bamba",
              Month: 2,
              Time: "12:12:00",
              Year: 2019
            })
          }
        >
          <Text>Click to expend</Text>
        </TouchableOpacity>
        {/** end checking  */}

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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    flex: 0.3,
    fontWeight: "bold",
    textAlign: "center"
  },
  headerSelectedMonth: {
    fontSize: 14 * fontScale * 1.3
  },
  headerSalaryAndExpend: {
    fontSize: 14 * fontScale
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
