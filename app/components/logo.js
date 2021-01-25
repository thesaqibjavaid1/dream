import React from 'react';
import {View, Image} from 'react-native';
import Theme from '../theme';

const LogoComponent = ({navigation, route}) => {
  return (
    <View>
      <Image
        style={{
          width: Theme.width * 0.45,
          height: Theme.height * 0.2,
          resizeMode: 'contain',
        }}
        source={require('../resources/logo.png')}
      />
    </View>
  );
};

export default LogoComponent;
