import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountInfo from './components/AccountInfo';
import Background from './components/Background';
import BillingInfo from './components/BillingInfo';

const SettingsScreen = ({ navigation }) => {
    async function handleLogout() {
        await AsyncStorage.removeItem('userToken');
        navigation.replace('LogIn');
    }
    return (
        <Background>
            <View style={{marginTop: '15%', width: '100%'}}>
                <AccountInfo username='sberrey'/>
                <BillingInfo username='sberrey'/>
                <Button onPress={handleLogout} title='Log Out' />
            </View>
        </Background>
    );
}

export default SettingsScreen;
