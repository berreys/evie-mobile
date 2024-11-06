import React from "react";
import { TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';
import Background from "../../components/Background";
import {global_styles} from '../../../styles';
import { useEffect, useState } from "react";

const RegisterStep1 = ({ navigation }) => {

    const [userChosen, chooseUser] = useState(false);
    const [ownerChosen, chooseOwner] = useState(false);
    
    return (
        <Background>
            <View style={[styles.center]}>
                <View style={[styles.row_container]}>
                    <View style={userChosen ? [styles.row_item, global_styles.secondary_color] : [styles.row_item, global_styles.primary_color]} onTouchEnd={() => {if(!userChosen){chooseUser(true); chooseOwner(false)}}}>
                        <View style={[styles.circle]}>

                        </View>
                        <Text style={[global_styles.bold_text, styles.text, styles.item_header]}>Charger User</Text>
                        <Text style={[global_styles.text, styles.text, styles.item_text]}>I want to view EV chargers near me and use them.</Text>
                    </View>
                    <View style={ownerChosen ? [styles.row_item, global_styles.secondary_color] : [styles.row_item, global_styles.primary_color]} onTouchEnd={() => {if(!ownerChosen){chooseOwner(true); chooseUser(false)}}}>
                        <View style={[styles.circle]}>
                            
                        </View>
                        <Text style={[global_styles.bold_text, styles.text, styles.item_header]}>Charger Owner</Text>
                        <Text style={[global_styles.text, styles.text, styles.item_text]}>I own an EV charger and want to allow other users to use it.</Text>
                    </View>
                </View>
                <View style={[styles.row_container]}>
                    <TouchableOpacity style={[global_styles.secondary_color, styles.button]} onPress={() => navigation.replace('LogIn')}>
                        <Text style={[styles.button_text]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[global_styles.primary_color, styles.button]} onPress={() => navigation.navigate('RegisterStep2')}>
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
    }
})

export default RegisterStep1;