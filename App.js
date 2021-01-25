import React from 'react';
import {View} from 'react-native';
import {Routes} from './app/routes';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Routes />
      <FlashMessage position="top" />
    </View>
  );
};

export default App;
