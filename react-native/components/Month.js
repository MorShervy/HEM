import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");

const month = [
  { key: 1, value: "Jan" },
  { key: 2, value: "Feb" },
  { key: 3, value: "Mar" },
  { key: 4, value: "Apr" },
  { key: 5, value: "May" },
  { key: 6, value: "Jan" },
  { key: 7, value: "Jul" },
  { key: 8, value: "Aug" },
  { key: 9, value: "Sep" },
  { key: 10, value: "Oct" },
  { key: 11, value: "Nov" },
  { key: 12, value: "Dec" }
];

const Month = props => {
  const _renderItem = ({ item }) => (
    <TouchableOpacity style={styles.touchableOpacity}>
      <View style={styles.graphSize}>
        <View style={styles.graphFilled} />
      </View>
      <Text style={styles.text}>{item.value}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.flatList}
      data={month}
      renderItem={_renderItem}
      keyExtractor={item => item.key.toString()}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  );
};
export default Month;

const styles = StyleSheet.create({
  flatList: { flex: 1, width: width },
  touchableOpacity: {
    flex: 1,
    width: width / 5,
    alignItems: "center",
    marginHorizontal: 15
  },
  graphSize: {
    flex: 0.85,
    width: "100%",
    borderWidth: 1,
    justifyContent: "flex-end"
  },
  graphFilled: { flex: 0.2, backgroundColor: "blue" },
  text: { flex: 0.15 }
});
