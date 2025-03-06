import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountInfo from './components/AccountInfo';
import Background from './components/Background';
import { StyleSheet } from 'react-native';
import {useEffect, useState} from "react";
import AppointmentInfo from './components/AppointmentInfo';
import {API_URL, GEOCODE_KEY} from '@env';

const AppointmentsScreen = ({ navigation }) => {
    const [appts, setAppts] = useState([]);


    const fetchAppointmentData = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            const isChargerOwner = await AsyncStorage.getItem('driver') === "F";
            const fetchData = {
                "username": username,
                "isChargerOwner": isChargerOwner
            }
            const queryParams = new URLSearchParams(fetchData).toString();
            console.log(API_URL + `/getAppointments?${queryParams}`);
            const response = await fetch(API_URL + `/getAppointments?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
        
            const fetchedAppts = await response.json();
            console.log(fetchedAppts);
        
            if (!response.ok) {
            throw new Error(fetchedAppts.message || 'Failed to get charger data.');
            }
        
            setAppts(fetchedAppts)
        } catch (error) {
            console.error('Error retrieving charger data:', error.message);
            setAppts([]);
        }
    }

    useEffect(() => {
        fetchAppointmentData();
    }, []);
    
    return (
        <Background>
            <View style={{marginTop: '15%', width: '100%', borderColor: 'black', borderWidth: '5px'}} key={appts.length}>
                <Text style={[styles.text, styles.header]}>Appointments</Text>
                {
                    appts.length > 0
                    ?
                    appts.map((a) => (
                        <AppointmentInfo data={a} key={a.id}/>
                    ))
                    :
                    <></>
                }
                
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 5,
        // borderWidth: 1,
        padding: 5,
        width: '100%',
        paddingLeft: 24
    },
    text: {
        fontFamily: 'Nexa-Light',
        fontSize: 16
    },
    header: {
        fontFamily: 'Nexa-Heavy',
        fontSize: 24
    }
});


export default AppointmentsScreen;
