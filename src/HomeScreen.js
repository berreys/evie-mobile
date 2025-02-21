import { Button, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, {Marker, Region} from 'react-native-maps';
import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';

const HomeScreen = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [locationError, setLocationError] = useState('');

    useEffect( () => {
        const getLocation = async () => {
            console.log("HERE");
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                console.log('No location permission');
                setLocationError('Permission to access location was denied.');
            }
            else{
                let currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation.coords);
                setRegion({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                });
            }
        };
        getLocation();
    }, []);

    const markerTest = location ? {
        lat: location.latitude,
        long: location.longitude,
        title: 'Your Location'
    } : {}

    return (
        <View style={{flex:1}}>
            {region ? (
                <MapView style={StyleSheet.absoluteFillObject} showsUserLocation={true} showsMyLocationButton={true} initialRegion={region}>
                    <Marker
                        coordinate={{latitude: markerTest.lat, longitude: markerTest.long}}
                        title={markerTest.title}
                    />
                </MapView>
            ) : (
                <Text style={{textAlign: 'center', marginTop: 20}}>
                    {locationError ? locationError : 'Fetching location...'}
                </Text>
            )}
        </View>
    );
}

export default HomeScreen;
