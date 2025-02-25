import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import { global_styles } from "../../styles";

const ChargerInfo = ({username}) => {

    const [chargerInfo, setChargerInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChargerInfo = async () => {
            //TODO get actual account data
            setChargerInfo({zip: '84604', state: 'Utah', city: 'Provo', addressLine1: '1 Example Drive', addressLine2: 'Apt. 1'});
            setChargerInfo(null);
            setLoading(false);
        }
        
        fetchChargerInfo();
    }, []);

    if(loading){
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }
    if(error){
        return (
            <View style={styles.container}>
                <Text>Error</Text>
            </View>
        )
    }
    if(!chargerInfo){
        return (
            <View style={styles.container}>
                <Text style={[styles.text, styles.header]}>Charger Information</Text>
                <TouchableOpacity style={[global_styles.secondary_color, styles.button]} onPress={{}}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.header]}>Charger Information</Text>
            <Text style={[styles.text]}>{'Address: ' + chargerInfo.addressLine1 + ' ' + chargerInfo.city + ', ' + chargerInfo.state}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10000,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
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
})

export default ChargerInfo;
