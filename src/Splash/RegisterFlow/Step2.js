import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';
import Background from "../../components/Background";
import {global_styles} from '../../../styles';

const RegisterStep2 = ({ navigation }) => {
    const placeHolderTextColor = '#ffffff77';
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [hideError, setHideError] = useState(true);

    function allFieldsPopulated() {
        return(
            firstName &&
            lastName &&
            email &&
            username &&
            password &&
            confirmPassword
        )
    }
    function doPasswordsMatch() {
        return password === confirmPassword;
    }
    function isUsernameAvailable() {
        return username !== "used";
        // TODO: call backend to ensure available username
    }

    const handleSubmit = async () => {
        if(!allFieldsPopulated()) {
            setHideError(false);
            return;
        }
        if(!doPasswordsMatch()) {
            setHideError(false);
            return;
        }
        if(!isUsernameAvailable()) {
            setHideError(false);
            return;
        }
        navigation.replace('LoggedIn');
    }

    return (
        <Background>
            <View style={[styles.center]}>
                <View style={[styles.center_container]}>
                    <TextInput placeholder="First Name"         placeholderTextColor={placeHolderTextColor} style={[styles.input]} onChangeText={(e) => setFirstName(e)}        ></TextInput>
                    <TextInput placeholder="Last Name"          placeholderTextColor={placeHolderTextColor} style={[styles.input]} onChangeText={(e) => setLastName(e)}         ></TextInput>
                    <TextInput placeholder="Email"              placeholderTextColor={placeHolderTextColor} style={[styles.input]} onChangeText={(e) => setEmail(e)}            keyboardType="email-address" autoCapitalize="none" autoCorrect={false} ></TextInput>
                    <TextInput placeholder="Username"           placeholderTextColor={placeHolderTextColor} style={[styles.input]} onChangeText={(e) => setUsername(e)}         ></TextInput>
                    <TextInput placeholder="Password"           placeholderTextColor={placeHolderTextColor} style={[styles.input]} onChangeText={(e) => setPassword(e)}         secureTextEntry={true} ></TextInput>
                    <TextInput placeholder="Confirm Password"   placeholderTextColor={placeHolderTextColor} style={[styles.input]} onChangeText={(e) => setConfirmPassword(e)}  secureTextEntry={true} ></TextInput>
                    <View style={[styles.row_container]}>
                        <TouchableOpacity style={[global_styles.secondary_color, styles.button]} onPress={() => navigation.pop()}>
                            <Text style={[styles.button_text]}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[global_styles.primary_color, styles.button]} onPress={handleSubmit}>
                            <Text style={[styles.button_text]}>Continue</Text>
                        </TouchableOpacity>
                    </View>
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
    input: {
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#ffffff77',
        fontSize: 20,
        fontFamily: 'Nexa-Heavy',
        color: '#ffffff',
        padding: 10,
        marginTop: 10
    },
    row_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 5
    },
    item_text: {
        fontSize: 15
    },
    center_container: {
        position: 'absolute',
        top: '20%',
        width: '80%',
        // borderWidth: 2,
        // borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',

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

export default RegisterStep2;
