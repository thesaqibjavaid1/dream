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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import ImagePicker from 'react-native-image-picker-view';
import api from '../api/api';
import LocaleButton from '../components/localeButton';
import AsyncStorage from '@react-native-community/async-storage';

const ProfileScreen = ({route, navigation}) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [fName, setFNmae] = useState('');
  const [sdName, setSdName] = useState('');
  const [tdName, setTdName] = useState('');
  const [lName, setLName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  let emailRef = React.createRef();
  let fNameRef = React.createRef();
  let sdNameRef = React.createRef();
  let tdNameRef = React.createRef();
  let lNameRef = React.createRef();
  let mobileRef = React.createRef();
  let passwordRef = React.createRef();
  let cPasswordRef = React.createRef();

  React.useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('USER');
      let user = JSON.parse(data);
      console.log(user);
      setFNmae(user.firstname);
      setSdName(user.secondname);
      setTdName(user.thirdname);
      setLName(user.fourthname);
      setEmail(user.email);
      setMobileNo(user.phone_number);
      setImage(user.image);
      setLoading(false);
    })();
  }, [fName, sdName, tdName, lName, email, mobileNo, image]);

  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator size={'large'} color={Theme.whiteColor} />
      </SafeAreaView>
    );
  }
  console.log(image);

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
      <KeyboardAwareScrollView>
        <View>
          {image ? (
            <Image
              style={{
                width: 120,
                height: 120,
                resizeMode: 'center',
                borderRadius: 25,
                alignSelf: 'center',
                overflow: 'hidden',
              }}
              source={{uri: image}}
            />
          ) : (
            <Image
              style={{
                width: 120,
                height: 120,
                resizeMode: 'contain',
                borderRadius: 50,
                alignSelf: 'center',
                overflow: 'hidden',
              }}
              source={require('../resources/man.png')}
            />
          )}
          <Text
            style={{
              color: Theme.whiteColor,
              fontFamily: Theme.fontFamily,
              fontSize: Theme.width * 0.0,
              textAlign: 'center',
            }}>
            {fName + ' ' + sdName}
          </Text>
          <TextInput
            ref={emailRef}
            style={styles.textInputLogin}
            //placeholder={t('auth:text_email_address')}
            placeholderTextColor={Theme.grey}
            value={fName + ' ' + sdName + ' ' + tdName + ' ' + lName}
            returnKeyType={'next'}
            editable={false}
            blurOnSubmit={false}
            autoCapitalize="none"
            // onSubmitEditing={() => mobileRef.current.focus()}
            // onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            ref={emailRef}
            style={styles.textInputLogin}
            //placeholder={t('auth:text_email_address')}
            placeholderTextColor={Theme.grey}
            value={email}
            returnKeyType={'next'}
            editable={false}
            blurOnSubmit={false}
            autoCapitalize="none"
            // onSubmitEditing={() => mobileRef.current.focus()}
            // onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            ref={mobileRef}
            style={styles.textInputLogin}
            placeholderTextColor={Theme.grey}
            //placeholder={t('auth:text_mobile_number')}
            returnKeyType={'next'}
            value={mobileNo}
            keyboardType="number-pad"
            blurOnSubmit={false}
            editable={false}
            autoCapitalize="none"
            // onSubmitEditing={() => passwordRef.current.focus()}
            // onChangeText={(text) => setMobileNo(text)}
          />

          <TouchableOpacity disabled={loading} onPress={() => {}}>
            <View style={styles.buttonStyle}>
              <Text
                style={{
                  color: Theme.mainColor,
                  fontSize: 15,
                  fontFamily: Theme.fontFamily,
                  textAlign: 'center',
                }}>
                {t('auth:text_update_profile')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

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
    alignSelf: 'center',
    height: Theme.height * 0.05,
    borderColor: Theme.whiteColor,
    backgroundColor: Theme.whiteColor,
    borderWidth: 1,
    alignSelf: 'center',
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
  btnSection: {
    width: Theme.width * 0.4,
    height: Theme.height * 0.05,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginHorizontal: 10,
    marginTop: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export default ProfileScreen;
