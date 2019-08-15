import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    Dimensions,
    StyleSheet,
    AsyncStorage
} from "react-native";

const AddIncomeModal = props => {

    console.log("prp:", props.user)

    return (
        <Modal
            style={{ flex: 0.8 }}
            animationType="slide"
            transparent={false}
            visible={props.openIncomeModal}
            onRequestClose={props.closeIncomeModal}
        >
            <Text>Add Income at Month{props.user !== null && props.user.accountID} </Text>



        </Modal>
    )
}

export default AddIncomeModal;