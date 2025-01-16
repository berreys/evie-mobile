import React from "react";
import { TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';
import Background from "../../components/Background";
import {global_styles} from '../../../styles';
import { useEffect, useState } from "react";
import FloatingErrorMessage from "../../components/FloatingErrorMessage";



const RegisterStep1 = ({ navigation }) => {

    const [userChosen, chooseUser] = useState(false);
    const [ownerChosen, chooseOwner] = useState(false);
    const [canContinue, setCanContinue] = useState(false);
    const [hideError, setHideError] = useState(true);

    useEffect(() => {
        // User can continue to next screen if one of the options has been chosen
        setCanContinue(userChosen || ownerChosen);
        // If error is being shown, hide it when an option is chosen
        if(!hideError){
            setHideError(userChosen || ownerChosen);
        }
    }, [userChosen, ownerChosen]);

    const UserTypeOption = ({headerText, descriptionText, switchVar, onPress}) => {
        return (
            <View style={switchVar ? [styles.row_item, global_styles.secondary_color] : [styles.row_item, global_styles.primary_color]} onTouchEnd={onPress}>
                <View style={[styles.circle]}>

                </View>
                <Text style={[global_styles.bold_text, styles.text, styles.item_header]}>{headerText}</Text>
                <Text style={[global_styles.text, styles.text, styles.item_text]}>{descriptionText}</Text>
            </View>
        );
    }

    const handleContinue = () => {
        if(canContinue) navigation.navigate('RegisterStep2');
        else setHideError(false);
    }

    return (
        <Background>
            <View style={[styles.center]}>
                <View style={[styles.row_container]}>
                    <UserTypeOption
                        headerText="Charger User"
                        descriptionText="I want to view EV chargers near me and use them."
                        switchVar={userChosen}
                        onPress={() => {if(!userChosen){chooseUser(true); chooseOwner(false)}}}
                    />
                    <UserTypeOption
                        headerText="Charger Owner"
                        descriptionText="I own an EV charger and want to allow other users to use it."
                        switchVar={ownerChosen}
                        onPress={() => {if(!ownerChosen){chooseOwner(true); chooseUser(false)}}}
                    />
                </View>
                <FloatingErrorMessage hideError={hideError} msg={"Select an option to continue."} percentFromTop={"55%"}/>
                <View style={[styles.row_container]}>

                    <TouchableOpacity style={[global_styles.secondary_color, styles.button]} onPress={() => navigation.replace('LogIn')}>
                        <Text style={[styles.button_text]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[global_styles.primary_color, styles.button]} onPress={handleContinue}>
                        <Text style={[styles.button_text]}>Continue</Text>
                    </TouchableOpacity>
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
    item_text: {
        fontSize: 15
    },
    row_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 5
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
        top: '55%'
    }
})

export default RegisterStep1;
