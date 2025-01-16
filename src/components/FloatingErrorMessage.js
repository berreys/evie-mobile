import {Text, View, StyleSheet} from "react-native";
import {global_styles} from "../../styles";
import React from "react";

const FloatingErrorMessage = ({hideError, msg, percentFromTop}) => {
    const styles = StyleSheet.create({
        error_message: {
            color: '#D73100',
            fontSize: 15
        },
        error_message_container: {
            position: 'absolute',
            top: percentFromTop
        }
    })

    if(hideError) return null;
    return(
        <View style={[styles.error_message_container]}>
            <Text style={[global_styles.bold_text, styles.error_message]}>{msg}</Text>
        </View>
    );
}



export default FloatingErrorMessage;
