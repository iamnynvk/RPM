import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import Homescreen from '../screens/Homescreen';
import Detailscreen from '../screens/Detailscreen';
import {NAVIGATION} from '../constants/navigation';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION.HOME}
        component={Homescreen}
        options={{
          headerTitle: 'Dashboard',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#233975',
          },
        }}
      />
      <Stack.Screen name={NAVIGATION.DETAIL} component={Detailscreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
