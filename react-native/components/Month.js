import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  StyleSheet
} from "react-native";

const { width, fontScale } = Dimensions.get("window");

const Month = ({ item }, props) => {
  //render ech month (as component)
  if (item.key !== undefined && new Date().getMonth() + 1 >= item.key) {
    let _graphFilled = []; // cant change with state, so we set difference reference for ech item
    let _textExpend = [];

    AsyncStorage.getItem(item.key.toString())
      .then(res => JSON.parse(res))
      .then(res => {
        //console.log("res: ", res);
        let salary = res !== null && parseFloat(res.salary);
        let expend = res !== null && parseFloat(res.expend);
        salary !== false && expend !== false && salary > expend // change the graph fill with ref
          ? _graphFilled[item.key].setNativeProps({
              style: { flex: parseFloat((expend / salary).toFixed(2)) }
            })
          : salary !== false && salary > expend
          ? _graphFilled[item.key].setNativeProps({ style: { flex: 0 } })
          : _graphFilled[item.key].setNativeProps({ style: { flex: 1 } });
        expend !== false &&
          _textExpend[item.key].setNativeProps({
            text: parseInt(expend).toString()
          });
      });

    const HandleClickMonth = () => {
      props.HandleClickMonth(item.key);
    };

    return (
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={HandleClickMonth}
      >
        <Text style={styles.text}>{item.value.substring(0, 3)}</Text>
        <View style={styles.graphSize}>
          <View
            style={styles.graphFilled}
            ref={ref => {
              // cant change with state, so we set difference reference for ech item
              _graphFilled[item.key] = ref;
            }}
          />
        </View>
        <TextInput
          style={[styles.text, { fontSize: 9 * fontScale }]}
          editable={false}
          ref={ref => {
            // cant change with state, so we set difference reference for ech item
            _textExpend[item.key] = ref;
          }}
        />
      </TouchableOpacity>
    );
  }
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
    flex: 0.7,
    width: "100%",
    borderWidth: 1,
    justifyContent: "flex-end",
    backgroundColor: "green"
  },
  graphFilled: { backgroundColor: "red" },
  text: { flex: 0.15, fontSize: 12 * fontScale }
});
