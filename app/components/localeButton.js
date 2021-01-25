import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Theme from '../theme.ts';
import AsyncStorage from '@react-native-community/async-storage';

const LocaleButton = (props) => {
  const [local, setLocal] = React.useState('');
  React.useEffect(() => {
    (async () => {
      const locale = await AsyncStorage.getItem('LOCALE');
      console.log('locale: ', locale);
      if (locale == null) {
        setLocal('en');
        await AsyncStorage.setItem('LOCALE', 'en');
      } else {
        setLocal(locale);
      }
    })();
  }, [local]);

  const setLanguage = async () => {
    const locale = await AsyncStorage.getItem('LOCALE');
    if (locale == 'en') {
      setLocal('ar');
      await AsyncStorage.setItem('LOCALE', 'ar');
    } else {
      setLocal('en');
      await AsyncStorage.setItem('LOCALE', 'en');
    }
  };

  console.log('hhhhhhhh: ', local);
  return (
    <TouchableOpacity
      onPress={() => {
        setLanguage();
      }}>
      <View style={{marginTop: 10}}>
        <Text
          style={{
            color: Theme.mainColor,
            fontSize: 15,
            padding: 10,
            paddingHorizontal: 15,
            borderWidth: 1,
            borderColor: Theme.mainColor,
            borderRadius: 10,
          }}>
          {local == 'en' ? 'Arabic' : 'English'}
        </Text>
      </View>
    </TouchableOpacity>
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

export default LocaleButton;
