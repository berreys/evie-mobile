import {View, Text, StyleSheet} from "react-native";
import {useEffect, useState} from "react";

const BillingInfo = ({username}) => {

    const [billingInfo, setBillingInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBillingInfo = async () => {
            //TODO get actual account data
            setBillingInfo({zip: '84604', state: 'Utah', city: 'Provo', addressLine1: '1 Example Drive', addressLine2: 'Apt. 1'});
            setLoading(false);
        }
        
        fetchBillingInfo();
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

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.header]}>Billing Information</Text>
            <Text style={[styles.text]}>{'Address: ' + billingInfo.addressLine1 + ' ' + billingInfo.city + ', ' + billingInfo.state}</Text>
            <Text style={[styles.text]}>{'Card: **** **** 1234'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 5,
        // borderWidth: 1,
        padding: 5,
        width: '100%'
    },
    text: {
        fontFamily: 'Nexa-Light'
    },
    header: {
        fontFamily: 'Nexa-Heavy'
    }
})

export default BillingInfo;
