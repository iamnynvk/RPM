import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import Homescreen from '../screens/Homescreen';
import Detailscreen from '../screens/Detailscreen';
import {NAVIGATION} from '../constants/navigation';
import BodyDetailScreen from '../screens/BodyDetailScreen';

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
      <Stack.Screen
        name={NAVIGATION.DETAIL}
        component={Detailscreen}
        options={({route}) => ({
          title:
            route.params.patientFirstName + ' ' + route.params.patientLastName,
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#233975',
          },
        })}
      />
      <Stack.Screen
        name={NAVIGATION.BODYDETAIL}
        component={BodyDetailScreen}
        options={({route}) => ({
          title: route.params.titles,
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#233975',
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
