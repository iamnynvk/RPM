import React from 'react';
import {StatusBar} from 'react-native';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';

const index = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#233975" barStyle="light-content" />
      <Routes />
    </AuthProvider>
  );
};

export default index;
