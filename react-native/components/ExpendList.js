import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const ExpendList = props => {
  return (
    <FlatList
      style={styles.flatList}
      data={props.getExpensesOfMonth}
      renderItem={({ item }) => (
        <View
          style={{
            //paddingVertical: "2%",
            //marginHorizontal: "2%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
            shadowOpacity: 1,
            shadowColor: "rgba(0,0,0,0.15)",
            shadowRadius: 5,
            elevation: 15
          }}
        >
          <Text>{`${(item.Info !== undefined && "Expenses") || "Incomes"}: ${
            item.Amount
          }`}</Text>
          <Text>{(item.Info !== undefined && item.Info) || item.Type}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      //showsVerticalScrollIndicator={false}
      //extraData={props}
    />
  );
};
export default ExpendList;

const styles = StyleSheet.create({
  flatList: { flex: 1 }
});
