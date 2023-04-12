import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Settings from './screens/Settings'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalScreenOptions } from './config/globalScreenOptions';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/Login';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
