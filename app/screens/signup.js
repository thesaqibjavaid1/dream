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

const SignUpScreen = ({route, navigation}) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [fName, setFNmae] = useState('');
  const [sdName, setSdName] = useState('');
  const [tdName, setTdName] = useState('');
  const [lName, setLName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  let emailRef = React.createRef();
  let fNameRef = React.createRef();
  let sdNameRef = React.createRef();
  let tdNameRef = React.createRef();
  let lNameRef = React.createRef();
  let mobileRef = React.createRef();
  let passwordRef = React.createRef();
  let cPasswordRef = React.createRef();

  const validate = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      !email ||
      !fName ||
      !sdName ||
      !tdName ||
      !lName ||
      !mobileNo ||
      !password ||
      !cPassword ||
      !image ||
      password !== cPassword
    ) {
      showMessage({
        message: 'please fill all fields',
        type: 'danger',
      });
      console.log('image: ', image);
      return false;
    } else if (!reg.test(email)) {
      showMessage({
        message: `${t('auth:text_email_not_correct')}`,
        type: 'danger',
      });
      return false;
    } else {
      console.log('here');
      return true;
    }
  };
  const register = async () => {
    console.log('register api called');
    const data = new FormData();
    data.append('firstname', fName);
    data.append('secondname', sdName);
    data.append('thirdname', tdName);
    data.append('fourthname', lName);
    data.append('email', email);
    data.append('phone_number', mobileNo);
    data.append('password', password);
    data.append('image', image);
    data.append('apikey', Theme.apikey);
    try {
      const results = await api
        .post('/users/create.php', data, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('res: ', res);
          setLoading(false);
          if (res.data.error) {
            showMessage({message: 'Failed to create user', type: 'danger'});
          } else {
            showMessage({message: 'User Created', type: 'success'});
            navigation.navigate('login');
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log('Signup error');
          Alert.alert(err.message);
          console.log(err);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
      Alert.alert(err.message);
    }
  };
  const options = {
    title: 'Select Avatar',
  };
  const addImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const img = {
          uri: response.uri,
          type: response.type,
          name:
            response.fileName ||
            response.uri.substr(response.uri.lastIndexOf('/') + 1),
        };
        setImage(img);
      }
    });
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
      <KeyboardAwareScrollView>
        <View>
          <Text
            style={{
              color: Theme.whiteColor,
              fontSize: 18,
              textAlign: 'center',
              fontFamily: Theme.fontFamily,
              marginTop: Theme.height * 0,
            }}>
            {t('auth:text_first_create_account')}
          </Text>
          {image ? (
            <Image
              style={{
                width: 70,
                height: 70,
                resizeMode: 'contain',
                borderRadius: 50,
                alignSelf: 'center',
              }}
              source={{uri: image.uri}}
            />
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              width: Theme.width * 0.85,
              marginTop: 10,
              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              ref={fNameRef}
              style={[styles.textInputLogin, {width: Theme.width * 0.2}]}
              placeholderTextColor={Theme.grey}
              placeholder={t('auth:text_first_name')}
              returnKeyType={'next'}
              blurOnSubmit={false}
              autoCapitalize="none"
              onSubmitEditing={() => sdNameRef.current.focus()}
              onChangeText={(text) => setFNmae(text)}
            />
            <TextInput
              ref={sdNameRef}
              style={[styles.textInputLogin, {width: Theme.width * 0.2}]}
              placeholderTextColor={Theme.grey}
              placeholder={t('auth:text_second_name')}
              returnKeyType={'next'}
              blurOnSubmit={false}
              autoCapitalize="none"
              onSubmitEditing={() => tdNameRef.current.focus()}
              onChangeText={(text) => setSdName(text)}
            />
            <TextInput
              ref={tdNameRef}
              style={[styles.textInputLogin, {width: Theme.width * 0.2}]}
              placeholderTextColor={Theme.grey}
              placeholder={t('auth:text_third_name')}
              returnKeyType={'next'}
              blurOnSubmit={false}
              autoCapitalize="none"
              onSubmitEditing={() => lNameRef.current.focus()}
              onChangeText={(text) => setTdName(text)}
            />
            <TextInput
              ref={lNameRef}
              style={[styles.textInputLogin, {width: Theme.width * 0.2}]}
              placeholderTextColor={Theme.grey}
              placeholder={t('auth:text_last_name')}
              returnKeyType={'next'}
              blurOnSubmit={false}
              autoCapitalize="none"
              onSubmitEditing={() => emailRef.current.focus()}
              onChangeText={(text) => setLName(text)}
            />
          </View>
          <TextInput
            ref={emailRef}
            style={styles.textInputLogin}
            placeholder={t('auth:text_email_address')}
            placeholderTextColor={Theme.grey}
            returnKeyType={'next'}
            blurOnSubmit={false}
            autoCapitalize="none"
            onSubmitEditing={() => mobileRef.current.focus()}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            ref={mobileRef}
            style={styles.textInputLogin}
            placeholderTextColor={Theme.grey}
            placeholder={t('auth:text_mobile_number')}
            returnKeyType={'next'}
            keyboardType="number-pad"
            blurOnSubmit={false}
            autoCapitalize="none"
            onSubmitEditing={() => passwordRef.current.focus()}
            onChangeText={(text) => setMobileNo(text)}
          />
          <TextInput
            ref={passwordRef}
            style={styles.textInputLogin}
            placeholderTextColor={Theme.grey}
            placeholder={t('auth:text_password')}
            returnKeyType={'next'}
            secureTextEntry={true}
            blurOnSubmit={false}
            autoCapitalize="none"
            onSubmitEditing={() => cPasswordRef.current.focus()}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            ref={cPasswordRef}
            style={styles.textInputLogin}
            placeholderTextColor={Theme.grey}
            placeholder={t('auth:text_confirm_password')}
            secureTextEntry={true}
            returnKeyType={'done'}
            blurOnSubmit={false}
            autoCapitalize="none"
            onChangeText={(text) => setCPassword(text)}
          />
          <View
            style={{flexDirection: 'row', width: '85%', alignSelf: 'center'}}>
            <Text
              style={{
                color: Theme.whiteColor,
                marginTop: 10,
                fontFamily: Theme.fontFamily,
                fontSize: 16,
              }}>
              {t('auth:text_insert_image')}
            </Text>
            <TouchableOpacity
              onPress={() => {
                addImage();
              }}
              style={styles.btnSection}>
              <Text style={styles.btnText}>Choose File</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              if (validate()) {
                setLoading(true);
                register();
              }
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
                  {t('auth:text_sign_up')}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('login');
            }}>
            <View style={styles.buttonStyle}>
              {loading ? (
                <ActivityIndicator size={'small'} color={Theme.whiteColor} />
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
export default SignUpScreen;
