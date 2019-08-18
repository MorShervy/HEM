import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Expend = ({ item }, props) => (
  <View
    style={[
      styles.item,
      { backgroundColor: (item.Info !== undefined && "#df8888") || "#b2ffb2" }
    ]}
  >
    <View style={styles.itemPosition}>
      <View style={styles.itemDescription}>
        <View style={{ marginTop: (item.Info === undefined && "3%") || null }}>
          {item.Info !== undefined && (
            <Text style={styles.text}>
              {`${item.Day}/${item.Month}/${item.Year}`}
            </Text>
          )}
          <Text style={styles.text}>{item.Time.substring(0, 5)}</Text>
        </View>
        <View>
          <Text style={styles.text}>{item.Amount}</Text>
          <Text style={styles.text}>
            {(item.Info !== undefined && item.Info) || item.Type}
          </Text>
        </View>

        <Text style={[styles.text, styles.payment]}>
          {item.Info !== undefined &&
            ((item.CategoryID === 1 && "Credit") ||
              (item.CategoryID === 2 && "Cash") ||
              (item.CategoryID === 3 && "Bank") ||
              (item.CategoryID === 4 && "Loan"))}
        </Text>
      </View>
      <View style={styles.itemButtons}>
        <TouchableOpacity onPress={() => props.HandleDeleteExpense(item)}>
          <AntDesign name="delete" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
export default Expend;

const styles = StyleSheet.create({
  item: {
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
  },
  itemPosition: { flex: 1, flexDirection: "row" },
  itemDescription: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  itemButtons: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "3%"
  },
  text: {
    textAlign: "center"
  },
  payment: {
    marginTop: "3%"
  }
});
