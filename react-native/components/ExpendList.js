import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Expend from "./Expend";

const ExpendList = props => {
  const _renderItem = item => Expend(item, props);

  return (
    <FlatList
      style={styles.flatList}
      data={props.getSalaryAndExpensesOfMonth}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};
export default ExpendList;

const styles = StyleSheet.create({
  flatList: { flex: 0.7, flexGrow: 1 }
});
