import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const ExpendList = props => {
  const _renderItem = ({ item }) => (
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
      <View
        style={{
          flex: 1,
          flexDirection: "row"
        }}
      >
        <View style={{ flex: 0.5, justifyContent: "space-evenly" }}>
          <Text>{`${(item.Info !== undefined && "Expenses") || "Incomes"}: ${
            item.Amount
          }`}</Text>
          <Text>{(item.Info !== undefined && item.Info) || item.Type}</Text>
        </View>
        <View style={{ flex: 0.5, flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>-</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Edit</Text>
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
      //showsVerticalScrollIndicator={false}
      //extraData={props}
    />
  );
};
export default ExpendList;

const styles = StyleSheet.create({
  flatList: { flex: 1, flexGrow: 1 }
});
