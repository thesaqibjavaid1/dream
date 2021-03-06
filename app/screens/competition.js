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
import CountDown from 'react-native-countdown-component';
import Theme from '../theme';
import {useTranslation} from 'react-i18next';
import '../locale/config-i18n';
import {showMessage} from 'react-native-flash-message';
import LogoComponent from '../components/logo';
import api from '../api/api';
import ProfileComponent from '../components/profile';
import AsyncStorage from '@react-native-community/async-storage';

const CompetitionScreen = ({route, navigation}) => {
  const {t} = useTranslation();

  const [loading, setLoading] = useState(true);
  const [competition, setCompetition] = useState({});
  const [user, setUser] = useState({});

  React.useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('USER');
      setUser(JSON.parse(user));
    })();
  }, []);

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

  React.useEffect(() => {
    (async () => {
      await getCompetition();
    })();
  }, []);

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
      <View style={{}}>
        <View style={{alignSelf: 'center'}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              color: Theme.whiteColor,
            }}>
            {competition.title}
          </Text>
          <Image
            style={{
              width: Theme.width * 0.9,
              height: Theme.height * 0.25,
              resizeMode: 'contain',
              borderRadius: 20,
              alignSelf: 'center',
            }}
            source={{uri: competition.image_url}}
          />

          <Text
            style={{
              fontSize: Theme.height * 0.025,
              fontFamily: Theme.fontFamily,
              marginTop: 5,
              color: Theme.whiteColor,
              textAlign: 'center',
            }}>
            {t('auth:text_remaining_time')}
          </Text>
          <View style={{marginTop: 10}}>
            <CountDown
              style={{}}
              until={competition.time_left}
              onFinish={() => alert('finished')}
              onPress={() => alert('hello')}
              size={Theme.height * 0.04}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: Theme.height * 0.07,
            }}>
            <Image
              style={{width: 25, height: 25, marginHorizontal: 10}}
              source={require('../resources/fb.png')}
            />
            <Image
              style={{width: 25, height: 25, marginHorizontal: 10}}
              source={require('../resources/sc.png')}
            />
            <Image
              style={{width: 25, height: 25, marginHorizontal: 10}}
              source={require('../resources/insta.png')}
            />
          </View>
        </View>
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
    height: 70,
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 50,
  },
  buttonText: {
    color: Theme.mainColor,
    fontSize: 25,
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
});
export default CompetitionScreen;
