import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    SafeAreaView,
    ScrollView, Image
} from "react-native";

import { DrawerItems } from 'react-navigation';

const DrawerWithLogoutButton = (props) => (

    <ScrollView contentContainerStyle={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>

            <View style={styles.user}>
                <Image
                    source={require('./assets/user.png')}
                    style={styles.img}
                />
            </View>
        </SafeAreaView>
    </ScrollView>
)


const styles = StyleSheet.create({
    user: {
        backgroundColor: '#2C3E50'

    },
    img: {
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 60,
    }
})

export default DrawerWithLogoutButton