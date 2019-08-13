import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  AsyncStorage
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
  const _renderItem = ({ item }) => {
    // render ech month (as component)
    let _graphFilled = []; // cant change with state, so we set difference reference for ech item
    AsyncStorage.getItem(item.key.toString())
      .then(res => JSON.parse(res))
      .then(res => {
        let salary = res !== null && parseFloat(res.salary);
        let expend = res !== null && parseFloat(res.expend);

        salary !== false && expend !== false && salary > expend // change the graph fill with ref
          ? _graphFilled[item.key].setNativeProps({
              style: { flex: parseFloat((expend / salary).toFixed(2)) }
            })
          : salary !== false && salary > expend
          ? _graphFilled[item.key].setNativeProps({ style: { flex: 0 } })
          : _graphFilled[item.key].setNativeProps({ style: { flex: 1 } });
      });

    return (
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => props.HandleClickMonth(item.key)}
      >
        <View style={styles.graphSize}>
          <View
            style={styles.graphFilled}
            ref={ref => {
              // cant change with state, so we set difference reference for ech item
              _graphFilled[item.key] = ref;
            }}
          />
        </View>
        <Text style={styles.text}>{item.value}</Text>
      </TouchableOpacity>
    );
  };

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
    width: width / 13,
    alignItems: "center",
    marginHorizontal: 10
  },
  graphSize: {
    flex: 0.85,
    width: "100%",
    borderWidth: 1,
    justifyContent: "flex-end",
    backgroundColor: "green"
  },
  graphFilled: { backgroundColor: "red" },
  text: { flex: 0.15 }
});
