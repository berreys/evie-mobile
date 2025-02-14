import { Button, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';

const HomeScreen = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [locationError, setLocationError] = useState('');

    useEffect(() => {
        const getLocation = async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                setLocationError('Permission to access location was denied.');
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
            setRegion({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            });
        };
        getLocation();
    }, []);

    return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //     <Text>Home Screen here</Text>
        //     <Button onPress={() => navigation.navigate('Account')} title="Go to account"/>
        //     <Icon name="rocket" />
        // </View>
        <View style={{flex:1}}>
            <MapView style={StyleSheet.absoluteFillObject} showsUserLocation={true} showsMyLocationButton={true} initialRegion={region} />
        </View>
    );
}

export default HomeScreen;
