import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, Text, TextInput, View, Image } from 'react-native';
import Background from '../components/Background';
import { global_styles } from '../../styles';
import React, { useEffect, useState } from "react";
import FloatingErrorMessage from '../components/FloatingErrorMessage';
import { API_URL } from '@env';


const LogInScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hideError, setHideError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async () => {
        fetchBody = {"username" : username, "password" : password};
        console.log("FETCH BODY", fetchBody);
        try {
            const response = await fetch(API_URL + '/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(fetchBody),
            });
        
            const data = await response.json();
        
            if (!response.ok) {
                throw new Error(data.message || 'Failed to login');
            }
            await AsyncStorage.setItem('userToken', 'abc123');  // Simulate login by setting a token
            await AsyncStorage.setItem('username', data.username);
            await AsyncStorage.setItem('driver', data.vehicleOwner ? "T" : "F");
            navigation.replace('LoggedIn');  // Navigate to Home after login
        
            return data;
        }
        catch (error) {
            console.log("Can't log in");
            setErrorMsg('Not valid credentials');
            setHideError(false);
        }
    };

    const handleRegister = async () => {
        navigation.replace('Register');
    }

    return (
        <Background>
            <View style={[styles.center_container]}>
                <Text style={[styles.login_title]}>evie</Text>
                <TextInput placeholder="Username" placeholderTextColor={'#ffffff77'} style={[styles.input]} onChangeText={(e) => setUsername(e)} />
                <TextInput placeholder="Password" placeholderTextColor={'#ffffff77'} secureTextEntry={true} style={[styles.input]} onChangeText={(e) => setPassword(e)} autoCorrect={false}/>
                <FloatingErrorMessage hideError={hideError} msg={errorMsg} percentFromTop={"64%"}/>
                <Text style={[global_styles.text, styles.recover_password]} onPress={() => console.log("Forgot password")}>Forgot Password?</Text>
                <TouchableOpacity style={[styles.button, styles.login_button]} onPress={handleLogin}>
                    <Text style={styles.text}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.register_button]} onPress={handleRegister}>
                    <Text style={styles.text}>NO ACCOUNT YET? CREATE ONE NOW</Text>
                </TouchableOpacity>
                <Text style={[global_styles.bold_text, styles.text, styles.text_account_option_1]}>- OR -</Text>
                <Text style={[global_styles.text, styles.text, styles.text_account_option_2]}>Sign in with</Text>
                <View style={[styles.row_container]}>
                    <View style={[styles.image_background, styles.row_item]} onTouchEnd={() => console.log("Google")}>
                        <Image source={require('../../assets/Google_Logo.png')} style={[styles.image]}></Image>
                    </View>
                    <View style={[styles.image_background, styles.row_item]} onTouchEnd={() => console.log("Facebook")}>
                        <Image source={require('../../assets/Facebook_Logo.png')} style={[styles.image]}></Image>
                    </View>
                </View>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 100000,
        width: '100%',
        alignItems: 'center',
        marginTop: 20
    },
    login_button: {
      backgroundColor: '#007a9e'
    },
    register_button: {
      backgroundColor: '#C6CBD3',
    },
    text: {
      fontSize: 15,
      color: 'white',
      fontFamily: 'Nexa-Heavy'
    },
    recover_password: {
      color: 'white',
      fontFamily: 'Nexa-Light',
      paddingTop: 5,
      width: '100%',
      textAlign: 'right'
    },
    text_account_option_1: {
      paddingTop: 15
    },
    text_account_option_2: {
      paddingTop: 5
    },
    center_container: {
      position: 'absolute',
      top: '20%',
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: '100%',
      borderBottomWidth: 2,
      borderBottomColor: '#ffffff77',
      fontSize: 20,
      fontFamily: 'Nexa-Heavy',
      color: '#ffffff',
      padding: 10,
      marginTop: 10
    },
    login_title: {
      color: '#ffffff',
      fontSize: 60,
      fontFamily: 'Nexa-Heavy',
      marginBottom: 100
    },
    image: {
      height: 40,
      width: 40
    },
    image_background: {
      backgroundColor: 'white',
      padding: 5,
      borderRadius: 100000
    },
    row_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      margin: 5,
      paddingTop: 0
  },
  row_item: {
    margin: 10
},
});

export default LogInScreen;
