import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';
import Background from "../../components/Background";
import {global_styles} from '../../../styles';
import FloatingErrorMessage from "../../components/FloatingErrorMessage";
import { useRoute } from "@react-navigation/native";
import { API_URL } from '@env';

const ChargerOwnerRegistration = ({ navigation }) => {
    const placeHolderTextColor = '#ffffff77';
    const [zip, setZip] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [addrLine1, setAddrLine1] = useState("");
    const [addrLine2, setAddrLine2] = useState("");

    const [hideError, setHideError] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const route = useRoute();
    const { firstName, lastName, email, username, password } = route.params;

    function allFieldsPopulated() {
        return(
            zip &&
            state &&
            city &&
            addrLine1
        )
    }

    const registerUser = async (userData) => {
        console.log(userData)
        try {
          const response = await fetch(API_URL + '/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.message || 'Failed to register');
          }
      
          return data;
        } catch (error) {
          console.error('Error registering user:', error.message);
          throw error;
        }
    };

    const handleSubmit = async () => {
        if(!allFieldsPopulated()) {
            setHideError(false);
            setErrorMsg('Fill out all fields before continuing.');
            return;
        }
        await registerUser({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "username": username,
            "password": password,
            "chargerOwner": true,
            "vehicleOwner": false,
            "zip": zip,
            "state": state,
            "city": city,
            "addrLine1": addrLine1,
            "addrLine2": addrLine2
        })
        navigation.replace('LoggedIn');
    }

    return (
        <Background>
            <View style={[styles.center]}>
                <View style={[styles.center_container]}>
                    <TextInput placeholder="Address Line 1"         placeholderTextColor={placeHolderTextColor} style={[styles.input]} onChangeText={(e) => setAddrLine1(e)}                           ></TextInput>
                    <TextInput placeholder="Address Line 2 (optional)"          placeholderTextColor={placeHolderTextColor} style={[styles.input]} onChangeText={(e) => setAddrLine2(e)}                        ></TextInput>
                    <TextInput placeholder="City"              placeholderTextColor={placeHolderTextColor} style={[styles.input]} onChangeText={(e) => setCity(e)}                    ></TextInput>
                    <TextInput placeholder="State"           placeholderTextColor={placeHolderTextColor} style={[styles.input]} onChangeText={(e) => setState(e)}  ></TextInput>
                    <TextInput placeholder="Zip Code"           placeholderTextColor={placeHolderTextColor} style={[styles.input]} onChangeText={(e) => setZip(e)}    ></TextInput>
                    <FloatingErrorMessage hideError={hideError} msg={errorMsg} percentFromTop={"77%"}/>
                    <View style={[styles.row_container]}>
                        <TouchableOpacity style={[global_styles.secondary_color, styles.button]} onPress={() => navigation.pop()}>
                            <Text style={[styles.button_text]}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[global_styles.primary_color, styles.button]} onPress={handleSubmit}>
                            <Text style={[styles.button_text]}>Finish</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    outline: {
        borderWidth: 1,
        borderColor: 'white'
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
    row_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 5
    },
    item_text: {
        fontSize: 15
    },
    center_container: {
        position: 'absolute',
        top: '20%',
        width: '80%',
        // borderWidth: 2,
        // borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',

    },
    row_item: {
        margin: 10,
        width: '45%',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        paddingBottom: 20
    },
    item_header: {
        fontSize: 20,
        marginBottom: 10
    },
    text: {
        color: 'white'
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    background: {
        flex: 1,
        alignItems: 'center'
    },
    button_text: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'Nexa-Heavy'
    },
    button: {
        padding: 10,
        borderRadius: 100000,
        width: '40%',
        margin: 10,
        alignItems: 'center',
        marginTop: 20
    },
    circle: {
        backgroundColor: 'white',
        width: 10,
        height: 10,
        borderRadius: 5,
        position: 'absolute',
        right: 5,
        top: 5
    },
    error_message: {
        color: '#D73100',
        fontSize: 15
    },
    error_message_container: {
        position: 'absolute',
        top: '80%'
    }
})

export default ChargerOwnerRegistration;
