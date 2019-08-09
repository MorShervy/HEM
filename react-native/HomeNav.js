import React, { Component } from 'react';
import {
    View,
    Dimensions,

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
            initialRouteName: "Home",
            navigationOptions: {
                drwaerLabel: 'Home',
                drawerIcon: ({ tintColor }) => (
                    <Ionicons
                        name="ios-home"
                        size={25}
                    />
                ),
            },
        },
        MyProfile: {
            screen: MyProfile,
            initialRouteName: "MyProfile",
            navigationOptions: {
                drwaerLabel: 'My Profile',
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
        contentOptions: {
            activeItemKey: 0,
            itemsContainerStyle: {
                marginVertical: 0,
            },
            iconContainerStyle: {
                opacity: 0.3
            }
        }
    }

)

export default class AppScreen extends Component {
    static router = HomeNav.router;
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', 'Home'),
        };
    };

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
