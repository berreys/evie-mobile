import { Button, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, {Marker, Region} from 'react-native-maps';
import React, {useState, useEffect, useRef} from 'react';
import * as Location from 'expo-location';

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

    useEffect( () => {
        const getLocation = async () => {
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
            let markers = [];
            // TODO: call backend and get all (maybe nearby?) chargers to display 
            markers.push({
                lat: 40.7128,
                long: -74.0060,
                title: 'New York'
            });
            setMarkers(markers);
        };
        getMarkers();
        getLocation();
    }, []);

    const markerTest = location ? {
        lat: location.latitude,
        long: location.longitude,
        title: 'Your Location'
    } : {}

    return (
        <>
            <View style={styles.mapContainer}>
                {region ? (
                    <MapView ref={mapRef} style={[styles.map, StyleSheet.absoluteFillObject]} showsUserLocation={true} showsMyLocationButton={true} region={region}>
                        <Marker
                            coordinate={{latitude: markerTest.lat, longitude: markerTest.long}}
                            title={markerTest.title}
                        >
                            <View style={styles.markerContainer}>
                              {/* Circular icon */}
                                <View style={styles.markerCircle}>
                                    <Icon name="bolt" size={24} color="green" />
                                </View>
                                {/* Pointer tail */}
                                <View style={styles.markerTail} />
                            </View>
                        </Marker>
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
