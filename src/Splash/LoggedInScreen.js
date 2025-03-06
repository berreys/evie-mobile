import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../HomeScreen.js';
import SettingsScreen from '../SettingsScreen';
import AccountScreen from '../AccountScreen';
import AppointmentsScreen from '../AppointmentsScreen.js';

// Create Stack Navigators
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

function AppointmentsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppointmentsMain" component={AppointmentsScreen} />
    </Stack.Navigator>
  );
}

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const LoggedInScreen = ({ navigation }) => {
  const [isDriver, setIsDriver] = useState(null);

  useEffect(() => {
    const checkDriverStatus = async () => {
      const driverStatus = await AsyncStorage.getItem('driver');
      setIsDriver(driverStatus === 'T'); // Convert to boolean
    };

    checkDriverStatus();
  }, []);

  if (isDriver === null) {
    return null; // Or a loading spinner if needed
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Appointments') iconName = 'calendar';
          else if (route.name === 'Settings') iconName = 'gears';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}
    >
      {isDriver && <Tab.Screen name="Home" component={HomeStack} />}
      {<Tab.Screen name="Appointments" component={AppointmentsStack} />}
      {<Tab.Screen name="Settings" component={SettingsStack} />}
    </Tab.Navigator>
  );
};

export default LoggedInScreen;
