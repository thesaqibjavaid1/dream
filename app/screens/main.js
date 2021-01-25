import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import Theme from '../theme';
import {useTranslation} from 'react-i18next';
import '../locale/config-i18n';
import {showMessage} from 'react-native-flash-message';
import LogoComponent from '../components/logo';
import ProfileComponent from '../components/profile';
import AsyncStorage from '@react-native-community/async-storage';

const MainScreen = ({route, navigation}) => {
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  React.useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('USER');
      setUser(JSON.parse(user));
    })();
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <View style={{marginTop: 10}}>
          <ProfileComponent user={user} />
        </View>
        <View>
          <LogoComponent />
        </View>
        <View style={{marginTop: 10}}>
          <Image
            style={{
              width: Theme.width * 0.2,
              height: Theme.height * 0.1,
              resizeMode: 'contain',
            }}
            source={require('../resources/icon.png')}
          />
        </View>
      </View>
      <View style={{marginTop: Theme.height * 0.04}}>
        <TouchableOpacity
          onPress={() => {
            if (user.has_code == 1) {
              //navigation.navigate('scratchSuccess');
              navigation.navigate('scratch');
            } else {
              navigation.navigate('scratch');
            }
          }}>
          <View style={styles.buttonStyle}>
            <Text style={styles.buttonText}>
              {t('auth:text_contest_entry')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('winners');
          }}>
          <View style={styles.buttonStyle}>
            <Text style={styles.buttonText}>{t('auth:text_the_winners')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('drawweek');
          }}>
          <View style={styles.buttonStyle}>
            <Text style={styles.buttonText}>
              {t('auth:text_Draw_this_week')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('competition');
          }}>
          <View style={styles.buttonStyle}>
            <Text style={styles.buttonText}>
              {t('auth:text_Track_Competition')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{flex: 1, flexDirection: 'column-reverse', marginBottom: 30}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: Theme.width * 0.85,
            alignSelf: 'center',
            marginTop: 30,
          }}>
          <Text
            onPress={() => {
              navigation.navigate('contact');
            }}
            style={styles.textBottom}>
            {t('auth:text_contact_info')}
          </Text>
          <Text style={styles.textBottom}>{t('auth:text_about_us')}</Text>
          <Text
            onPress={() => {
              navigation.navigate('terms');
            }}
            style={styles.textBottom}>
            {t('auth:text_term_and_conditions')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.mainColor,
  },
  buttonStyle: {
    width: '70%',
    alignSelf: 'center',
    backgroundColor: Theme.whiteColor,
    height: Theme.height * 0.07,
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 50,
  },
  buttonText: {
    color: Theme.mainColor,
    fontSize: Theme.height * 0.03,
    fontFamily: Theme.fontFamily,
    textAlign: 'center',
  },
  textInputLogin: {
    width: '85%',
    height: 50,
    borderColor: Theme.whiteColor,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
    fontFamily: Theme.fontFamily,
  },
  textBottom: {
    color: Theme.whiteColor,
    fontFamily: Theme.fontFamily,
    fontSize: Theme.width * 0.035,
  },
});
export default MainScreen;
