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
import api from '../api/api';
import AsyncStorage from '@react-native-community/async-storage';
import ProfileComponent from '../components/profile';
import {StackActions} from '@react-navigation/native';

const ScratchCodeScreen = ({route, navigation}) => {
  const {t} = useTranslation();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  React.useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('USER');
      setUser(JSON.parse(user));
    })();
  }, []);

  const saveUser = async (data) => {
    await AsyncStorage.setItem('USER', data);
  };

  console.log(user);

  const [competition, setCompetition] = useState({});

  const getCompetition = async () => {
    const data = new FormData();
    data.append('apikey', Theme.apikey);
    try {
      const results = await api
        .post('/competitions/read_single.php', data, {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setLoading(false);
          console.log('res: ', res);
          setCompetition(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log('competiton error: ', err);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getCode = async () => {
    const data = new FormData();
    data.append('apikey', Theme.apikey);
    data.append('comp_id', competition.id);
    data.append('user_id', user.user_id);
    try {
      const results = await api
        .post('/codes/create.php', data, {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setLoading(false);
          console.log('res: ', res);
          if (res.data) {
            saveUser(JSON.stringify(res.data));
            //navigation.dispatch(StackActions.replace('scratchSuccess'));
            navigation.dispatch(StackActions.replace('question'));
          } else {
            alert('Failed to purchase card');
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log('competiton error: ', err);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  React.useEffect(() => {
    (async () => {
      await getCompetition();
    })();
  }, []);

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
      <View style={{marginTop: Theme.height * 0.05}}>
        <View style={{alignSelf: 'center'}}>
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
                    fontSize: Theme.height * 0.015,
                    textAlign: 'center',
                    marginTop: 10,
                    fontFamily: Theme.fontFamily,
                  }}>
                  {t('auth:text_text_code_hidden')}
                </Text>
              </View>

              <Image
                style={{
                  height: Theme.height * 0.04,
                  width: Theme.width * 0.4,
                  position: 'absolute',
                  alignSelf: 'center',
                }}
                source={require('../resources/hide.png')}
              />
            </View>
          </ImageBackground>
        </View>
        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            getCode();
          }}>
          <View style={styles.buttonStyle}>
            {loading ? (
              <ActivityIndicator size={'small'} color={Theme.mainColor} />
            ) : (
              <Text style={styles.buttonText}>
                {t('auth:text_Participate_a_card')}
              </Text>
            )}
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
    height: Theme.height * 0.06,
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: Theme.mainColor,
    fontSize: 18,
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
export default ScratchCodeScreen;
