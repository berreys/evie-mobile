import { Button, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen here</Text>
            <Button onPress={() => navigation.navigate('Account')} title="Go to account"/>
            <Icon name="rocket" />
        </View>
    );
}

export default HomeScreen;