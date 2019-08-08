import React, { Component } from 'react';
import {
    View,
    Dimensions
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import DraweMenu from './DrawerMenu';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';

const { height, width } = Dimensions.get("window");

const HomeNav = createDrawerNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                drwaerLabel: 'Home',
                drwaerLabel: 'MyProfile',
                drawerIcon: ({ tintColor }) => (
                    <Ionicons
                        name="ios-home"
                        size={25}
                    />
                )
            },

        },
        MyProfile: {
            screen: MyProfile,
            navigationOptions: {
                drwaerLabel: 'MyProfile',
                drawerIcon: ({ tintColor }) => (
                    <Ionicons
                        name="ios-contact"
                        size={25}
                    />
                )
            },
        }
    },
    {
        contentComponent: DraweMenu,
    }

)

export default class AppScreen extends Component {
    static router = HomeNav.router;

    render() {

        return (

            <View
                style={{
                    width,
                    height,
                }}
            >
                <HomeNav navigation={this.props.navigation} />
                <KeyboardSpacer />
            </View>
        );
    }
}