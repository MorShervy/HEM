import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    StyleSheet,
    AsyncStorage,
    Picker,
    Button,
    DatePickerAndroid
} from "react-native";
import Modal from 'react-native-modal';
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const AddIncomeModal = props => {

    const handleOnPressDatePicker = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                //maxDate: new Date(),
                mode: 'default' // spiner or calender
            });
            if (action === DatePickerAndroid.dateSetAction) {
                console.log(year + '-' + month + '-' + day);
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
                        <Text style={styles.amountText}>Amount</Text>
                        <TextInput
                            placeholder="Amount"
                            style={styles.amountInput}
                            keyboardType="decimal-pad"
                        />
                    </View>
                    <View style={styles.itemView}>
                        <View style={styles.category}>
                            <Text style={styles.categoryText}>Choose Category</Text>
                            <View style={styles.categoryIcons}>
                                <View style={styles.iconView}>

                                    <Ionicons name="md-card" size={55} />
                                    <Text>Credit</Text>
                                </View>
                                <View style={styles.iconView}>
                                    <Ionicons name="ios-cash" size={55} />
                                    <Text>Cash</Text>
                                </View>
                                <View style={styles.iconView}>
                                    <Ionicons name="ios-paper" size={55} />
                                    <Text>Bank</Text>
                                </View>
                                <View style={styles.iconView}>
                                    <Ionicons name="ios-cash" size={55} />
                                    <Text>Loan</Text>
                                </View>

                            </View>

                        </View>
                        <View style={styles.itemView}>
                            {/* <Button title='Date Picker Example' onPress={handleOnPressDatePicker} /> */}
                        </View>
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
    amountInput: {
        width: width - 80,
        height: 40,
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        color: "#000",
        paddingHorizontal: 20,
    },
    amountText: {
        fontSize: 20, fontWeight: "bold", paddingLeft: 10
    },
    category: {
        flexDirection: "column",
        justifyContent: "space-between",

    },
    categoryText: {
        fontSize: 20, fontWeight: "bold", paddingLeft: 10
    },
    categoryIcons: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
    },
    iconView: {
        height: 55, width: 55, backgroundColor: "rgba(0,0,0,0.15)", flexDirection: "column", alignItems: "center",

    }
})