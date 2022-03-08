import React, {createContext, useState} from 'react';
import {getPatients} from '../utils/backend';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [data, setData] = useState();

  const fatchingData = async () => {
    try {
      const response = await getPatients();
      setData(response);
      return response;
    } catch (e) {
      console.log('Error in AuthProvider : ', e);
    }
  };

  const value = {
    fatchingData,
    data,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
