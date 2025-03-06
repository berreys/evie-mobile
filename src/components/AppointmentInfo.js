import {View, Text, StyleSheet} from "react-native";
import {useEffect, useState} from "react";

const AppointmentInfo = ({data}) => {

    return (
        <View style={styles.container}>
            <Text style={[styles.text]}>{'Name: ' + data.ownerFirstName+ ' ' + data.ownerLastName}</Text>
            <Text style={styles.text}>{'Start: ' + data.startDateTime}</Text>
            <Text style={styles.text}>{'End: ' + data.endDateTime}</Text>
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
    }
})

export default AppointmentInfo;
