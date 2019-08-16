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
import SQL from '../handlers/SQL';
import RefreshDataFromDBToAsyncStorage from '../handlers/RefreshDataFromDBToAsyncStorage';

const { width, height } = Dimensions.get("window");

const AddIncomeModal = props => {

    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString())
    const [getAmount, setAmount] = useState("")
    const [getType, setType] = useState("")


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

    const HandleNewIncome = async () => {
        const income = {
            accountID: props.accountID,
            date: selectedDate,
            time: new Date().toLocaleTimeString(),
            amount: getAmount,
            type: getType
        }
        //console.log("income:", income);
        const result = await SQL.InsertIncome(income)

        const insert = JSON.parse(result);
        // res = "0" inserted income to DB - need to Save data from DB to AsyncStorage and Get new User Details
        if (insert.res === "0") {
            const result = await RefreshDataFromDBToAsyncStorage.GetUserDetailsFromDB({ accountID: props.accountID })
            await props.navigation.replace("HomeNav", {
                incomes: result.incomes,
                expenses: result.expenses
            });
        }
        // res = "0" || "1" handle error
        else {

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
            visible={props.openIncomeModal}
            onRequestClose={props.closeIncomeModal}
        >
            <View style={styles.container}>
                <View style={styles.header}>

                    <Text style={styles.headerText}>New Income</Text>
                    <Ionicons name="ios-wallet" size={70} color="#83B5D1" style={styles.icon} />
                </View>
                <View style={styles.content}>
                    <View style={styles.itemView}>
                        <Text style={styles.itemText}>Amount</Text>
                        <TextInput
                            placeholder="Amount"
                            style={styles.itemInput}
                            keyboardType="decimal-pad"
                            onChangeText={e => setAmount(e)}
                        />
                    </View>
                    <View style={styles.itemView}>
                        <Text style={styles.itemText}>Title</Text>
                        <TextInput
                            placeholder="Title"
                            style={styles.itemInput}
                            onChangeText={(e) => setType(e)}
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
                    <View style={[styles.itemView, { paddingTop: 200 }]}>
                        <TouchableOpacity
                            onPress={HandleNewIncome}
                            style={styles.button}>
                            <Ionicons name="ios-checkmark" size={50} color="#fff" style={{ alignSelf: "center" }} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal >
    )
}

export default AddIncomeModal;

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
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 10
    },
    iconView: {
        height: 55,
        width: 55,
        backgroundColor: "rgba(0,0,0,0.15)",
        flexDirection: "column",
        alignItems: "center",
    },
    button: {
        width: width - 80,
        height: 50,
        backgroundColor: "#2C3E50",
    }
})