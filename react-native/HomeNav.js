import React, { Component } from 'react';
import {
    View,
    Dimensions
} from "react-native";

import { createDrawerNavigator } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import DraweMenu from './DrawerMenu';
import Home from './pages/Home';

const { height, width } = Dimensions.get("window");

const HomeNav = createDrawerNavigator(
    {
        Home: {
            navigationOptions: {
                drwaerLabel: 'Home'
            },
            screen: Home
        }
    }, {
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