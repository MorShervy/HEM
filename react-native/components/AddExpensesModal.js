import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    StyleSheet,
    AsyncStorage,
    DatePickerAndroid
} from "react-native";
import Modal from 'react-native-modal';
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const AddExpensesModal = props => {
    const [selectedCategory, setSelectedCategory] = useState("credit")
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString())

    const handleOnPressDatePicker = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                //maxDate: new Date(),
                mode: 'default' // spiner or calender
            });
            if (action === DatePickerAndroid.dateSetAction) {
                setSelectedDate(`${month + 1}/${day}/${year}`);
            }

        } catch ({ code, message }) {
            console.log('Cannot open date picker', message);
        }
    }

    return (
        <Modal
            style={{ flex: 1 }}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
            animationType="slide"
            transparent={false}
            visible={props.openExpensesModal}
            onRequestClose={props.closeExpensesModal}
        >
            <View style={styles.container}>
                <View style={styles.header}>

                    <Text style={styles.headerText}>New Expense</Text>
                    <Ionicons name="ios-wallet" size={70} color="#83B5D1" style={styles.icon} />
                </View>
                <View style={styles.content}>
                    <View style={styles.itemView}>
                        <Text style={styles.itemText}>Amount</Text>
                        <TextInput
                            placeholder="Amount"
                            style={styles.itemInput}
                            keyboardType="decimal-pad"
                        />
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemText}>Description</Text>
                        <TextInput
                            placeholder="Description"
                            style={styles.itemInput}
                        />
                    </View>
                    <View style={styles.itemView}>
                        <Text style={[styles.itemText, { paddingTop: 15 }]}>Date</Text>
                        <TouchableOpacity
                            style={styles.itemInput}
                            onPress={handleOnPressDatePicker}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Ionicons name="ios-calendar" size={30} />
                                <Text style={{ paddingLeft: 20, paddingTop: 5 }}>{selectedDate}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemView}>
                        <View style={styles.category}>
                            <Text style={styles.itemText}>Payment Method</Text>
                            <View style={styles.categoryIcons}>
                                <View style={[styles.iconView, { backgroundColor: selectedCategory === "credit" ? "#FF195A" : "#fff" }]}>
                                    <TouchableOpacity
                                        onPress={() => setSelectedCategory("credit")}
                                    >
                                        <Ionicons name="md-card" size={55} color="#17293F" />
                                    </TouchableOpacity>
                                    <Text>Credit</Text>
                                </View>
                                <View style={[styles.iconView, { backgroundColor: selectedCategory === "cash" ? "#FF195A" : "#fff" }]}>
                                    <TouchableOpacity
                                        onPress={() => setSelectedCategory("cash")}
                                    >
                                        <Ionicons name="ios-cash" size={55} color="#17293F" />
                                    </TouchableOpacity>
                                    <Text>Cash</Text>
                                </View>
                                <View style={[styles.iconView, { backgroundColor: selectedCategory === "bank" ? "#FF195A" : "#fff" }]}>
                                    <TouchableOpacity
                                        onPress={() => setSelectedCategory("bank")}
                                    >
                                        <Ionicons name="ios-paper" size={55} color="#17293F" />
                                    </TouchableOpacity>
                                    <Text>Bank</Text>
                                </View>
                                <View style={[styles.iconView, { backgroundColor: selectedCategory === "loan" ? "#FF195A" : "#fff" }]}>
                                    <TouchableOpacity
                                        onPress={() => setSelectedCategory("loan")}
                                    >
                                        <Ionicons name="ios-cash" size={55} color="#17293F" />
                                    </TouchableOpacity>
                                    <Text>Loan</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.itemView, { paddingTop: 70 }]}>
                        <TouchableOpacity style={styles.button}>
                            <Ionicons name="ios-checkmark" size={50} color="#fff" style={{ alignSelf: "center" }} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

export default AddExpensesModal;

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-start',
        backgroundColor: "#fff",
        shadowOpacity: 1,
        shadowColor: "rgba(0,0,0,0.15)",
        shadowRadius: 5,
        elevation: 15
    },
    header: {
        width: width - 40,
        height: height / 5,
        backgroundColor: "#2C3E50",
    },
    headerText: {
        textAlign: "center",
        fontSize: 35,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 20,
    },
    icon: {
        marginTop: 40,
        alignSelf: "center",
    },
    content: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        backgroundColor: "transparent",
        marginTop: 25
    },
    itemView: {
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingLeft: 15,
        paddingTop: 15,
    },
    itemInput: {
        width: width - 80,
        height: 40,
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        color: "#000",
        paddingHorizontal: 20,
    },
    itemText: {
        fontSize: 20, fontWeight: "bold", paddingLeft: 10
    },
    category: {
        flexDirection: "column",
        justifyContent: "space-between",

    },
    categoryIcons: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
    },
    iconView: {
        height: 55, width: 55, flexDirection: "column",
        alignItems: "center",
    },
    button: {
        width: width - 80,
        height: 50,
        backgroundColor: "#2C3E50",

    }
})