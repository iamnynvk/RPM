import React from 'react';
import {LogBox} from 'react-native';
import Provider from './src/navigation/index';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  "EventEmitter.removeListener('change', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`.",
]);

const App = () => {
  return <Provider />;
};

export default App;
