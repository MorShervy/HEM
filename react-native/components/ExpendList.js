import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ExpendList = props => {
  const _renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemPosition}>
        <View style={styles.itemDescription}>
          <View>
            <Text>{`Expense ${item.Amount}$`}</Text>
            <Text>{`on ${item.Info}`}</Text>
          </View>
          <View>
            <Text>{`at ${item.Day}/${item.Month}/${item.Year}`}</Text>
            <Text>{`in ${(item.CategoryID === 1 && "Credit") ||
              (item.CategoryID === 2 && "Cash") ||
              (item.CategoryID === 3 && "Bank") ||
              (item.CategoryID === 4 && "Loan")}`}</Text>
          </View>
        </View>
        <View style={styles.itemButtons}>
          <TouchableOpacity>
            <AntDesign name="edit" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.HandleDeleteExpense(item)}>
            <AntDesign name="delete" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.flatList}
      data={props.getExpensesOfMonth}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      extraData={props.getExpensesOfAllYears}
    />
  );
};
export default ExpendList;

const styles = StyleSheet.create({
  flatList: { flex: 1, flexGrow: 1 },
  item: {
    paddingVertical: "5%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowOpacity: 1,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowRadius: 5,
    elevation: 15
  },
  itemPosition: { flex: 1, flexDirection: "row" },
  itemDescription: {
    flex: 0.7,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  itemButtons: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: "3%"
  }
});
