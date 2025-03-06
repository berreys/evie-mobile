import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {global_styles} from "../../styles";
import React, {useState} from "react";
import Background from "./Background";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '@env';


const MakeAppointment = ({hideAppointment, setHideAppointment, chargerData}) => {
    const [start, setStart] = useState(new Date());
    const [showStart, setShowStart] = useState(false);

    const [end, setEnd] = useState(new Date());
    const [showEnd, setShowEnd] = useState(false);

    const onChangeStart = (event, selectedTime) => {
        setShowStart(false); // Hide picker after selection
        if (selectedTime) {
            setStart(selectedTime);
        }
    };

    const onChangeEnd = (event, selectedTime) => {
        setShowEnd(false); // Hide picker after selection
        if (selectedTime) {
            setEnd(selectedTime);
        }
    };

    const cancel = () => {
        setHideAppointment(true);
    }

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        
        // Convert to local timezone offset
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = "00"; // Set seconds to 00 since input example had that
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const confirm = async () => {
        console.log(chargerData);
        console.log(formatDateTime(start));
        console.log(end);
        const username = await AsyncStorage.getItem('username');
        const fetchBody = {
            "driverUsername": username,
            "startTime": formatDateTime(start),
            "endTime": formatDateTime(end),
            "chargerId": chargerData.id
        };
        console.log(fetchBody);
        try {
            console.log(API_URL);
            const response = await fetch(API_URL + '/addReservation', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(fetchBody),
            });
        
            const data = await response.json();
            console.log(data);
        
            if (!response.ok) {
                throw new Error(data.message || 'Failed to add reservation');
            }
            cancel();
        
            return data;
        }
        catch (error) {
            console.log("Couldn't add reservation");
        }
    }

    if(hideAppointment) return null;
    return(
        <View style={[styles.container]}>
            <Background style={styles.background}>
                <View style={[styles.row_container, {alignItems:'center'}]}>
                    <Text style={styles.datetimetext}>Select Start Time:</Text>
                    <DateTimePicker
                        value={start}
                        mode="time"
                        onChange={onChangeStart}
                        style={styles.datetimepicker}
                    />
                </View>
                <View style={[styles.row_container, {alignItems:'center'}]}>
                    <Text style={styles.datetimetext}>Select Start Time:</Text>
                    <DateTimePicker
                        value={end}
                        mode="time"
                        onChange={onChangeEnd}
                        style={styles.datetimepicker}
                    />
                </View>
                
                <View style={styles.row_container} >
                    <TouchableOpacity style={[global_styles.secondary_color, styles.button]} onPress={cancel}>
                        <Text style={[styles.button_text]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[global_styles.primary_color, styles.button]} onPress={confirm}>
                        <Text style={[styles.button_text]}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        </View>
        

        
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '80%',
        height: '80%',
        zIndex: 100000,
        borderRadius: 10000
    },
    background: {
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center'
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
    row_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 5
    },
    datetimetext: {
        fontSize: '20',
        fontFamily: 'Nexa-Heavy'
    }
});


export default MakeAppointment;
