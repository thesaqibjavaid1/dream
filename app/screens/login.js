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
  I18nManager,
  Alert,
} from 'react-native';
import Theme from '../theme';
import {useTranslation} from 'react-i18next';
import '../locale/config-i18n';
import {showMessage} from 'react-native-flash-message';
import LogoComponent from '../components/logo';
import LocaleButton from '../components/localeButton';
import api from '../api/api';
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = ({route, navigation}) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('saqib@gmail.com');
  const [password, setPassword] = useState('password');
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  let emailRef = React.createRef();
  let passwordRef = React.createRef();

  const saveUser = async (data) => {
    await AsyncStorage.setItem('USER', data);
  };

  const login = async () => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('apikey', Theme.apikey);
    try {
      const results = await api
        .post('/users/login.php', data, {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((res) => {
          console.log('res: ', res);

          setLoading(false);
          if (res.data.error) {
            showMessage({message: 'Invalid Credentails', type: 'danger'});
          } else {
            saveUser(JSON.stringify(res.data));
            navigation.navigate('main');
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log('Login error');
          Alert.alert(err.message);
          console.log(err);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
      Alert.alert(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          width: Theme.width * 0.85,
          justifyContent: 'space-between',
        }}>
        <View style={{marginTop: 10}}>
          <LocaleButton />
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
      <View style={{alignSelf: 'center'}}>
        <Image
          style={{
            width: Theme.width * 0.7,
            height: Theme.height * 0.1,
            resizeMode: 'contain',
          }}
          source={require('../resources/banner.png')}
        />
      </View>
      <TextInput
        ref={emailRef}
        value={email}
        style={[styles.textInputLogin, {marginTop: 25}]}
        placeholder={t('auth:text_email_address')}
        placeholderTextColor={Theme.whiteColor}
        keyboardType={'email-address'}
        returnKeyType={'next'}
        blurOnSubmit={false}
        autoCapitalize="none"
        onSubmitEditing={() => passwordRef.current.focus()}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        ref={passwordRef}
        value={password}
        style={styles.textInputLogin}
        placeholderTextColor={Theme.whiteColor}
        placeholder={t('auth:text_password')}
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        disabled={loading}
        onPress={() => {
          setLoading(true);
          login();
        }}>
        <View style={styles.buttonStyle}>
          {loading ? (
            <ActivityIndicator size={'small'} color={Theme.mainColor} />
          ) : (
            <Text
              style={{
                color: Theme.mainColor,
                fontSize: 15,
                fontFamily: Theme.fontFamily,
                textAlign: 'center',
              }}>
              {t('auth:text_button_login')}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}}>
        <View style={{width: '92%'}}>
          <Text
            style={{
              color: Theme.whiteColor,
              fontSize: 15,
              marginTop: 5,
              fontFamily: Theme.fontFamily,
              textAlign: 'right',
            }}>
            {t('auth:text_forgot_password')}
          </Text>
        </View>
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          flexDirection: 'column-reverse',
          marginBottom: 30,
          marginTop: 20,
        }}>
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('register');
          }}>
          <View style={styles.buttonStyle}>
            <Text
              style={{
                color: Theme.mainColor,
                fontSize: 15,
                fontFamily: Theme.fontFamily,
                textAlign: 'center',
              }}>
              {t('auth:text_sign_up')}
            </Text>
          </View>
        </TouchableOpacity>
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
    width: '85%',
    alignSelf: 'center',
    backgroundColor: Theme.whiteColor,
    height: Theme.height * 0.05,
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 5,
  },
  textInputLogin: {
    width: '85%',
    height: Theme.height * 0.05,
    borderColor: Theme.whiteColor,
    borderBottomWidth: 1,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
    color: Theme.whiteColor,
    fontFamily: Theme.fontFamily,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  textBottom: {
    color: Theme.whiteColor,
    fontFamily: Theme.fontFamily,
    fontSize: Theme.width * 0.035,
  },
});
export default LoginScreen;
