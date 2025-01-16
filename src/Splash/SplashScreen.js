import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import { Button, Text, View, ActivityIndicator } from 'react-native';

const SplashScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkLoginStatus = async () => {
        const userToken = await AsyncStorage.getItem('userToken');  // Fetch token
        if (userToken) {
          navigation.replace('LoggedIn');  // Navigate to Home if token exists
        } else {
          navigation.replace('LogIn');  // Navigate to Login if no token
        }
        setIsLoading(false);
      };

      checkLoginStatus();
    }, [navigation]);

    if (isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return null; // Don't display anything while checking login state
  }

  export default SplashScreen;
