import { Button, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, {Marker, Region} from 'react-native-maps';
import React, {useState, useEffect, useRef} from 'react';
import * as Location from 'expo-location';
import {API_URL, GEOCODE_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [locationError, setLocationError] = useState('');
    const [markers, setMarkers] = useState([])
    const mapRef = useRef();

    const resetRegion = () => {
        if(mapRef.current){
            mapRef.current.animateToRegion(region, 1000);
        }
    };

    const goToAccount = () => {
        navigation.navigate('Account');
    };

    const getChargers = async () => {
        try {
          const response = await fetch(API_URL + '/getChargers', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
      
          const chargers = await response.json();
      
          if (!response.ok) {
            throw new Error(chargers.message || 'Failed to get charger data.');
          }
      
          return chargers;
        } catch (error) {
          console.error('Error retrieving charger data:', error.message);
          return [];
        }
    }

    useEffect( () => {
        console.log("In useEffect of HomeScreen.js");
        const getLocation = async () => {
            const userUsername = await AsyncStorage.getItem('username');

            console.log("Username: " + userUsername);
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
        const getMarkers = async () => {
            console.log("GOOGLE MAPS API KEY", GEOCODE_KEY);
            try {
                console.log("Fetching chargers...");
                let chargers = await getChargers();
                console.log(chargers);
        
                // Function to geocode an address using Google Maps API
                const geocodeAddress = async (charger) => {
                    const address = `${charger.addressLine1}, ${charger.city}, ${charger.state} ${charger.zip}`;
                    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GEOCODE_KEY}`;
        
                    try {
                        let response = await fetch(url);
                        let data = await response.json();
                        
                        if (data.status === "OK" && data.results.length > 0) {
                            const { lat, lng } = data.results[0].geometry.location;
                            return { lat: lat, long: lng, title: address };
                        } else {
                            console.warn("Geocoding failed for:", address);
                            return null;
                        }
                    } catch (error) {
                        console.error("Geocoding error:", error);
                        return null;
                    }
                };
        
                // Convert chargers to markers with geocoding
                let markerPromises = chargers.map(geocodeAddress);
                let markers = (await Promise.all(markerPromises)).filter(marker => marker !== null);
        
                setMarkers(markers);
            } catch (error) {
                console.error(error);
            }
        };
        
        getMarkers();
        getLocation();
    }, []);

    return (
        <>
            <View style={styles.mapContainer}>
                {region ? (
                    <MapView key={markers.length} ref={mapRef} style={[styles.map, StyleSheet.absoluteFillObject]} showsUserLocation={true} showsMyLocationButton={true} region={region}>
                        {markers.length > 0 
                            ? 
                            markers.map((m) => 
                                <Marker key={m.title} coordinate={{latitude: m.lat, longitude: m.long}} title={m.title}>
                                    <View style={styles.markerContainer}>
                              {/* Circular icon */}
                                <View style={styles.markerCircle}>
                                    <Icon name="bolt" size={24} color="green" />
                                </View>
                                {/* Pointer tail */}
                                <View style={styles.markerTail} />
                            </View>
                                </Marker>
                            ) 
                            :
                            <></>}
                    </MapView>
                ) : (
                    <Text style={{textAlign: 'center', marginTop: 20}}>
                        {locationError ? locationError : 'Fetching location...'}
                    </Text>
                )}
            </View>
            
            <View style={styles.bottomContainer}>
                <Button title="Go to my location" onPress={resetRegion} />
                <Button title="Go to my account" onPress={goToAccount} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    bottomContainer: {
        width: '100%',
        height: '30%'
    },
    mapContainer: {
        flex: 1
    },
    map: {
        flex: 1
    },
    markerContainer: {
      alignItems: 'center',
    },
    markerCircle: {
      backgroundColor: 'white',
      padding: 12,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    markerTail: {
      width: 0,
      height: 0,
      borderLeftWidth: 15,
      borderRightWidth: 15,
      borderTopWidth: 12,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: 'black', // Matches border of the circle
      marginTop: -7, // Adjust to align with the circle
      zIndex:-1
    },
  });

export default HomeScreen;
