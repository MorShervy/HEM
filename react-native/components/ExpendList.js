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
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row"
        }}
      >
        <View
          style={{
            flex: 0.7,
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          <Text>{`${(item.Info !== undefined && "Expenses") || "Incomes"}: ${
            item.Amount
          }`}</Text>
          <Text>{(item.Info !== undefined && item.Info) || item.Type}</Text>
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: "row",
            justifyContent: "space-evenly"
          }}
        >
          <TouchableOpacity>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 100,
              borderWidth: 1,
              height: "50%",
              width: "23%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>-</Text>
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
