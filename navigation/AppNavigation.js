import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from '../screens/SignInScreen';
import ReportScreen from '../screens/ReportScreen';
import MapScreen from '../screens/MapScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { user } = useSelector(state => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Welcome' }>
        <Stack.Screen
          options={{ headerShown: false, presentation: 'modal' }}
          name="SignIn"
          component={AuthScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, presentation: 'modal' }}
          name="MapScreen"
          component={MapScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, presentation: 'modal' }}
          name="ReportScreen"
          component={ReportScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, presentation: 'modal' }}
          name="Welcome"
          component={WelcomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
3
