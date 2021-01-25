import React, {useEffect, useState} from 'react';
import {
  I18nManager,
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Theme from '../theme.ts';
import LogoComponent from '../components/logo';
import LocaleButton from '../components/profile';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {useTranslation} from 'react-i18next';

const ContactScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [name, setNmae] = useState('');
  const [message, setMessage] = useState('');

  let emailRef = React.createRef();
  let nameRef = React.createRef();
  let messageRef = React.createRef();

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
        <View>
          <LogoComponent />
        </View>
      </View>
      <Text
        style={{
          color: Theme.whiteColor,
          fontFamily: Theme.fontFamily,
          fontSize: Theme.width * 0.05,
          textAlign: 'center',
          marginTop: 40,
          marginBottom: 30,
        }}>
        {t('auth:text_contact_info')}{' '}
      </Text>
      <TextInput
        ref={nameRef}
        style={styles.textInputLogin}
        placeholder={t('auth:text_full_name')}
        placeholderTextColor={Theme.grey}
        value={name}
        returnKeyType={'next'}
        editable={false}
        blurOnSubmit={false}
        autoCapitalize="none"
        onSubmitEditing={() => emailRef.current.focus()}
        onChangeText={(text) => setNmae(text)}
      />
      <TextInput
        ref={emailRef}
        style={styles.textInputLogin}
        placeholder={t('auth:text_email_address')}
        placeholderTextColor={Theme.grey}
        value={email}
        returnKeyType={'next'}
        editable={false}
        blurOnSubmit={false}
        autoCapitalize="none"
        onSubmitEditing={() => messageRef.current.focus()}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        ref={messageRef}
        style={[styles.textInputLogin, {height: 100}]}
        placeholderTextColor={Theme.grey}
        placeholder={t('auth:text_contact_info')}
        returnKeyType={'next'}
        multiline={true}
        numberOfLines={5}
        value={message}
        blurOnSubmit={false}
        editable={false}
        autoCapitalize="none"
        onChangeText={(text) => setMessage(text)}
      />
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.buttonStyle}>
          <Text
            style={{
              color: Theme.mainColor,
              fontSize: 15,
              fontFamily: Theme.fontFamily,
              textAlign: 'center',
            }}>
            {t('auth:text_send')}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.mainColor,
    //marginTop:100,
  },
  textInputLogin: {
    width: '85%',
    height: Theme.height * 0.05,
    borderColor: Theme.whiteColor,
    backgroundColor: Theme.whiteColor,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
    color: Theme.blackColor,
    fontFamily: Theme.fontFamily,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  textBottom: {
    color: Theme.whiteColor,
    fontFamily: Theme.fontFamily,
    fontSize: Theme.width * 0.035,
  },
  buttonStyle: {
    width: Theme.width * 0.85,
    alignSelf: 'center',
    backgroundColor: Theme.whiteColor,
    height: Theme.height * 0.05,
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 5,
  },
});

export default ContactScreen;
