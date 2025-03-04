import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';


const RegisterStack = createNativeStackNavigator();

import RegisterStep1 from './RegisterFlow/Step1';
import RegisterStep2 from './RegisterFlow/Step2';
import CarOwnerRegistration from "./RegisterFlow/CarOwnerRegistration";

const RegisterStackScreen = ({navigation}) => {
    return (
        <RegisterStack.Navigator initialRouteName="RegisterStep1">
            <RegisterStack.Screen name="RegisterStep1" component={RegisterStep1} options={{ headerShown: false }} />
            <RegisterStack.Screen name="RegisterStep2" component={RegisterStep2} options={{ headerShown: false }} />
            <RegisterStack.Screen name="CarOwnerRegistration" component={CarOwnerRegistration} options={{ headerShown: false }} />
        </RegisterStack.Navigator>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default RegisterStackScreen;
