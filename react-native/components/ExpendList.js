import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Expend from "./Expend";

const ExpendList = props => {
  const _renderItem = item => Expend(item, props);

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
  flatList: { flex: 1, flexGrow: 1 }
});
