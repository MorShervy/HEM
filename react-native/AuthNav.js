import React, { Component } from "react";
import {
    View,
    Dimensions,
    AsyncStorage
} from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation";
import KeyboardSpacer from 'react-native-keyboard-spacer';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const { height, width } = Dimensions.get("window");

const AuthNav = createMaterialTopTabNavigator(
    {
        SignIn,
        SignUp,
    },
    {
        // swipeEnabled: true,
        // tabBarComponent: null,
        swipeEnabled: true,
        lazy: true,
        tabBarComponent: null
    }
);

export default class AuthScreen extends Component {

    static router = AuthNav.router;


    render() {
        return (
            <View
                style={{
                    width,
                    height,
                }}
            >
                <AuthNav navigation={this.props.navigation} />
                <KeyboardSpacer />
            </View>
        );
    }
}
