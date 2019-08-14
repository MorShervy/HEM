import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  StyleSheet
} from "react-native";

const { width } = Dimensions.get("window");

const Month = ({ item }, props) => {
  //render ech month (as component)
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

  const HandleClickMonth = () => {
    props.HandleClickMonth(item.key);
  };

  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={HandleClickMonth}
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
      <Text style={styles.text}>{item.value.substring(0, 3)}</Text>
    </TouchableOpacity>
  );
};
export default Month;

const styles = StyleSheet.create({
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
