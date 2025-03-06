import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountInfo from './components/AccountInfo';
import Background from './components/Background';
import { StyleSheet } from 'react-native';
import {useEffect, useState} from "react";
import AppointmentInfo from './components/AppointmentInfo';


const AppointmentsScreen = ({ navigation }) => {
    const [appts, setAppts] = useState([]);

    useEffect(() => {
            const fetchAppointmentData = async () => {
                //TODO get actual account data
                appts.push({ownerFirstName: "Sam", ownerLastName: "Berrey", startDateTime: "2025-03-05 21:30:00", endDateTime: "2025-03-05 21:45:00"});
                appts.push({ownerFirstName: "Sam", ownerLastName: "Test", startDateTime: "2025-03-05 21:30:00", endDateTime: "2025-03-05 21:45:00"});
                setLoading(false);
            }
            
            fetchAppointmentData();
        }, []);

    async function handleLogout() {
        await AsyncStorage.removeItem('userToken');
        navigation.replace('LogIn');
    }
    
    return (
        <Background>
            <View style={{marginTop: '15%', width: '100%', borderColor: 'black', borderWidth: '5px'}} key={appts.length}>
                <Text style={[styles.text, styles.header]}>Appointments</Text>
                {/* {appts.map((m) => {
                    <AppointmentInfo data={m}/>
                })} */}
                {appts.length > 0 ? <AppointmentInfo data={appts[0]} /> : <></>}
                {
                    appts.length > 0
                    ?
                    appts.map((a) => {
                        <AppointmentInfo data={a} />
                    })
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
