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

const AddExpensesModal = props => {



    return (
        <Modal
            style={{ flex: 1 }}
            animationType="slide"
            transparent={false}
            visible={props.openExpensesModal}
            onRequestClose={props.closeExpensesModal}
        >

        </Modal>
    )
}

export default AddExpensesModal;