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
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import MonthList from "../components/MonthList";
import { MonthData } from "../data/MonthData";
import { Ionicons, Octicons } from "@expo/vector-icons";
import AddIncomeModal from "../components/AddIncomeModal";
import ExpendList from "../components/ExpendList";
import AddExpensesModal from "../components/AddExpensesModal";
import SQL from "../handlers/SQL";
import RefreshDataFromDBToAsyncStorage from "../handlers/RefreshDataFromDBToAsyncStorage";

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
  const [getSalaryAndExpensesOfMonth, setSalaryAndExpensesOfMonth] = useState(
    null
  );

  const [getIncomeSum, setIncomeSum] = useState(0);
  const [getExpendSum, setExpendSum] = useState(0);

  const [toggleAdding, setToggleAdding] = useState(false);
  const [expensesModal, setExpensesModal] = useState(false);
  const [incomeModal, setIncomeModal] = useState(false);
  const [accountID, setAccountId] = useState(null);
  const [Loading, setLoading] = useState(false);

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
      .then(res => setAccountId(res.accountID));

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
    setSalaryAndExpensesOfMonth(
      incomesFiltered.concat(expensesFiltered).reverse()
    );
  };

  const ToggleAdding = () => {
    setToggleAdding(!toggleAdding);
  };

  const HandleDelete = async item => {
    console.log("item=", item);
    // changing date string format to fit the SQL
    const date = item.Date.slice(0, 10);
    const dateToSql = `${date.slice(6, 10)}/${date.slice(3, 5)}/${date.slice(
      0,
      2
    )}`;
    const itemToDelete = {
      accountID: item.AccountID,
      date: dateToSql,
      time: item.Time,
      amount: item.Amount
    };

    let result;
    if (item.Info !== undefined)
      //expense
      result = await SQL.DeleteExpense(itemToDelete);
    //income
    else result = await SQL.DeleteIncome(itemToDelete);

    //console.log("result=", result)
    if (result.res === "0") {
      const result = await RefreshDataFromDBToAsyncStorage.GetUserDetailsFromDB(
        { accountID: item.AccountID }
      );
      await props.navigation.replace("HomeNav", {
        incomes: result.incomes,
        expenses: result.expenses
      });
    }
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
        onPress={() => setIncomeModal(true)}
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

  return (
    <View style={styles.container}>
      {Loading && (
        <ActivityIndicator
          style={{
            flex: 1,
            paddingTop: 150,
            position: "absolute",
            marginLeft: width / 2
          }}
          size={50}
        />
      )}

      <View style={styles.graphFilledPosition}>
        <Text
          style={[styles.headerBoldText, { fontSize: 30 * fontScale }]}
        >{`${new Date().getFullYear()}`}</Text>

        <MonthList
          HandleClickMonth={HandleClickMonth}
          getCanExpend={getIncomeSum - getExpendSum}
        />
      </View>
      <View style={styles.selectedMonthPosition}>
        <Text
          style={[
            styles.headerBoldText,
            styles.headerSelectedMonth,
            styles.hederEchTextPosition,
            styles.rightSideBorder
          ]}
        >
          {`in\n${
            MonthData.find(month => month.key === getSelectedMonth).value
          }`}
        </Text>

        <View style={[styles.hederEchTextPosition, styles.rightSideBorder]}>
          <Text style={[styles.headerBoldText, styles.headerSalaryAndExpend]}>
            {getIncomeSum}
          </Text>
          <Text style={styles.text}>Incomes</Text>
        </View>

        <View style={[styles.hederEchTextPosition, styles.rightSideBorder]}>
          <Text
            style={[
              styles.headerBoldText,
              styles.headerSalaryAndExpend,
              styles.headerExpenseText
            ]}
          >
            {getExpendSum}
          </Text>
          <Text style={styles.text}>Expenses</Text>
        </View>

        <View style={styles.hederEchTextPosition}>
          <Text
            style={[
              styles.headerBoldText,
              styles.headerSalaryAndExpend,
              { color: (getIncomeSum - getExpendSum > 0 && "green") || "red" }
            ]}
          >
            {(getIncomeSum - getExpendSum).toFixed(2)}
          </Text>
          <Text style={styles.text}>Balance</Text>
        </View>
      </View>
      <View style={styles.expendDetailsPosition}>
        <ExpendList
          getSalaryAndExpensesOfMonth={getSalaryAndExpensesOfMonth}
          HandleDelete={HandleDelete}
        />

        {(toggleAdding && renderAddingIncome()) || null}
        {(toggleAdding && renderAddingExpenses()) || null}
        <View
          style={{ marginTop: "97%", position: "absolute", marginLeft: "80%" }}
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
        navigation={props.navigation}
        openIncomeModal={incomeModal}
        closeIncomeModal={() => setIncomeModal(false)}
        accountID={accountID}
      />
      <AddExpensesModal
        navigation={props.navigation}
        openExpensesModal={expensesModal}
        closeExpensesModal={() => setExpensesModal(false)}
        accountID={accountID}
      />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: { flex: 1 },
  selectedMonthPosition: {
    flex: 0.07,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  text: { fontSize: 10 * fontScale },
  hederEchTextPosition: { flex: 0.25, alignItems: "center" },
  headerBoldText: { fontWeight: "bold", textAlign: "center" },
  headerSelectedMonth: { fontSize: 18 * fontScale },
  headerSalaryAndExpend: { fontSize: 18 * fontScale },
  headerExpenseText: { color: "red" },
  canExpend: { fontWeight: "bold" },
  graphFilledPosition: { flex: 0.25 },
  expendDetailsPosition: { flex: 0.5 },
  rightSideBorder: { borderRightWidth: 1, borderRightColor: "gray" },
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
