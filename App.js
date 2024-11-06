// Import necessary components
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';

import LoggedInScreen from './src/Splash/LoggedInScreen';
import LogInScreen from './src/Splash/LogInScreen';
import SplashScreen from './src/Splash/SplashScreen';
import RegisterScreen from './src/Splash/RegisterScreen';

const SplashStack = createNativeStackNavigator();

import * as Font from 'expo-font';
const loadFonts = async () => {
  await Font.loadAsync({
    'Nexa-Heavy': require('./assets/Nexa-Heavy.ttf')
  });
  await Font.loadAsync({
    'Nexa-Light': require('./assets/Nexa-ExtraLight.ttf')
  })
};

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
      loadFonts().then(() => setFontsLoaded(true));
    }, []);

    if (!fontsLoaded) {
      return null; // Optionally return a loading spinner here
    }
    return (
        <NavigationContainer>
            <SplashStack.Navigator initialRouteName="Splash">
                <SplashStack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <SplashStack.Screen name="LoggedIn" component={LoggedInScreen} options={{headerShown: false}}/>
                <SplashStack.Screen name="LogIn" component={LogInScreen} options={{headerShown: false}} />
                <SplashStack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
            </SplashStack.Navigator>
        </NavigationContainer>
    )
}