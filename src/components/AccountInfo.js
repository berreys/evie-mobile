import {View, Text, StyleSheet} from "react-native";
import {useEffect, useState} from "react";

const AccountInfo = ({username}) => {

    const [accountInfo, setAccountInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAccountData = async () => {
            //TODO get actual account data
            setAccountInfo({firstName: 'Sam', lastName: 'Berrey', username: username, email: 'saberrey@gmail.com'});
            setLoading(false);
        }
        
        fetchAccountData();
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
            <Text style={[styles.text, styles.header]}>Account Information</Text>
            <Text style={[styles.text]}>{'Name: ' + accountInfo.firstName + ' ' + accountInfo.lastName}</Text>
            <Text style={styles.text}>{'Email: ' + accountInfo.email}</Text>
            <Text style={styles.text}>{'Username: ' + accountInfo.username}</Text>
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

export default AccountInfo;
