import { Button, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';

const HomeScreen = ({ navigation }) => {
    return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //     <Text>Home Screen here</Text>
        //     <Button onPress={() => navigation.navigate('Account')} title="Go to account"/>
        //     <Icon name="rocket" />
        // </View>
        <View style={{flex:1}}>
            <MapView style={StyleSheet.absoluteFillObject} showsUserLocation={true} showsMyLocationButton={true} />
        </View>
    );
}

export default HomeScreen;
