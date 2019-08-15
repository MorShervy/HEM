import React, { useEffect } from "react";
import { StyleSheet, FlatList, Dimensions } from "react-native";
import { MonthData } from "../data/MonthData";
import Month from "./Month";

const { width } = Dimensions.get("window");

const MonthList = props => {
  //useEffect(() => {}, [props.getSelectedMonthCanExpend]);

  const _renderItem = item => {
    return Month(item, props);
  };

  return (
    <FlatList
      style={styles.flatList}
      data={MonthData}
      renderItem={_renderItem}
      keyExtractor={item => item.key.toString()}
      showsHorizontalScrollIndicator={false}
      horizontal
      //extraData={props}
    />
  );
};
export default MonthList;

const styles = StyleSheet.create({
  flatList: { flex: 1, width: width }
});
