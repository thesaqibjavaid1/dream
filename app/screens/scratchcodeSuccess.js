import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import Theme from '../theme';
import {useTranslation} from 'react-i18next';
import '../locale/config-i18n';
import {showMessage} from 'react-native-flash-message';
import LogoComponent from '../components/logo';
import AsyncStorage from '@react-native-community/async-storage';
import ProfileComponent from '../components/profile';

const ScratchCodeSuccessScreen = ({route, navigation}) => {
  const {t} = useTranslation();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({});

  React.useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('USER');
      setUser(JSON.parse(user));
      setLoading(false);
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

      <View style={{marginTop: Theme.height * 0}}>
        <View style={{alignSelf: 'center'}}>
          <Text
            style={[
              styles.textBottom,
              {
                fontSize: Theme.height * 0.03,
                fontFamily: Theme.fontFamily,
                textAlign: 'center',
                marginBottom: 30,
                color: 'green',
              },
            ]}>
            {t('auth:text_buying_succeeded')}
          </Text>
          <ImageBackground
            style={{
              width: Theme.width * 0.8,
              height: Theme.height * 0.25,
              resizeMode: 'contain',
            }}
            source={require('../resources/scratch.png')}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Theme.mainColor,
                  width: Theme.width * 0.65,
                  height: Theme.height * 0.2,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: Theme.height * 0.02,
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  {t('auth:text_text_code_hidden')}
                </Text>
                {loading ? (
                  <ActivityIndicator size={'small'} color={Theme.mainColor} />
                ) : (
                  <Text
                    style={{
                      fontSize: Theme.height * 0.05,
                      textAlign: 'center',
                      marginTop: 10,
                    }}>
                    {user.code}
                  </Text>
                )}
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View
        style={{width: Theme.width * 0.85, alignSelf: 'center', marginTop: 5}}>
        <Text style={styles.desText}>{t('auth:text_wait_for_drafting')}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('competition');
        }}>
        <View style={styles.buttonStyle}>
          <Text
            style={{
              color: Theme.mainColor,
              fontSize: 15,
              fontFamily: Theme.fontFamily,
              textAlign: 'center',
            }}>
            {t('auth:text_remaining_time')}
          </Text>
        </View>
      </TouchableOpacity>

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
    height: 50,
    justifyContent: 'center',
    marginTop: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: Theme.mainColor,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: Theme.fontFamily,
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
  },
  textBottom: {
    color: Theme.whiteColor,
    fontFamily: Theme.fontFamily,
    fontSize: Theme.width * 0.035,
  },
  desText: {
    color: Theme.whiteColor,
    fontSize: 16,
    marginTop: 15,
    fontFamily: Theme.fontFamily,
    textAlign: 'center',
    width: Theme.width * 0.85,
    flexWrap: 'wrap',
  },
});
export default ScratchCodeSuccessScreen;
