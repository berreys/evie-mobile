import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
    async function handleLogout() {
        await AsyncStorage.removeItem('userToken');
        navigation.replace('LogIn');
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings Screen</Text>
            <Button onPress={handleLogout} title="Logout" />
        </View>
    );
}

export default SettingsScreen;