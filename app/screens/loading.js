import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text, Image} from 'react-native';
import Theme from '../theme.ts';
import LogoComponent from '../components/logo';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const LoadingScreen = ({navigation, route}) => {
  React.useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('USER');
      if (user) {
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('main'));
        }, 3000);
      } else {
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('login'));
        }, 3000);
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <LogoComponent />
      <Text style={{color: Theme.whiteColor}}>Please wait ...</Text>
      <ActivityIndicator size="small" color={Theme.whiteColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.mainColor,
    //marginTop:100,
  },
});

export default LoadingScreen;
