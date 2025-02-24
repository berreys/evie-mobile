import {View, Text, StyleSheet} from "react-native";
import {useEffect, useState} from "react";

const AccountInfo = () => {

    const [accountInfo, setAccountInfo] = useState(null);
    const [accountLoading, setAccountLoading] = useState(true);
    const [billingInfo, setBillingInfo] = useState(null);
    const [billingLoading, setBillingLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAccountData = async () => {
            //TODO get actual account data
            setAccountInfo({firstName: 'Sam', lastName: 'Berrey', username: 'sberrey', email: 'saberrey@gmail.com'});
            setAccountLoading(false);
        }
        const fetchBillingInfo = async () => {
            //TODO get actual billing info
            setBillingInfo({zip: '84604', state: 'Utah', city: 'Provo', addressLine1: '1 Example Drive', addressLine2: 'Apt. 1'});
            setBillingLoading(false);
        }
        fetchAccountData();
        fetchBillingInfo();
    }, []);

    if(accountLoading || billingLoading){
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
            <Text style={[styles.text, styles.header]}>{accountInfo.firstName + ' ' + accountInfo.lastName}</Text>
            <Text style={styles.text}>{accountInfo.email}</Text>
            <Text style={styles.text}>{accountInfo.username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        padding: 5
    },
    text: {
        fontFamily: 'Nexa-Light'
    },
    header: {
        fontFamily: 'Nexa-Heavy'
    }
})

export default AccountInfo;
