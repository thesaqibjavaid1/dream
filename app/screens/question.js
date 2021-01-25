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
import {StackActions} from '@react-navigation/native';

import api from '../api/api';

const QuestionScreen = ({route, navigation}) => {
  const {t} = useTranslation();

  const [qID, setQId] = useState('');
  const [qAns, setQAns] = useState('');
  const [q, setQ] = useState('');
  const [choiceArray, setChoiceArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  React.useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('USER');
      setUser(JSON.parse(user));
    })();
  }, [user]);
  React.useEffect(() => {
    getCode();
  }, []);
  const getCode = async () => {
    try {
      const results = await api
        .get(`/questions/rand_question.php?apikey=${Theme.apikey}`)
        .then((res) => {
          setQId(res.data.id);
          setQ(res.data.question);
          setQAns(res.data.answer);
          setChoiceArray(res.data.choices);
          console.log('res: ', res);
          setLoading(false);
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
  const validateAnswer = async (ans) => {
    console.log('ans: ', ans);
    const data = new FormData();
    data.append('apikey', Theme.apikey);
    data.append('id', qID);
    data.append('answer', ans);
    try {
      const results = await api
        .post('questions/validate_answer.php', data, {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setLoading(false);
          console.log('res: ', res);
          if ((res.data = 'correct')) {
            navigation.dispatch(StackActions.replace('scratchSuccess'));
          } else {
            alert('invalid answer please try again');
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log('validating error: ', err);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
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

      <View style={{width: Theme.width * 0.9, alignSelf: 'center'}}>
        <Text
          style={[
            styles.buttonText,
            {color: Theme.whiteColor, fontSize: Theme.height * 0.03},
          ]}>
          How you you can give question of our answers?
        </Text>
        {choiceArray &&
          choiceArray.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setLoading(true);
                validateAnswer(item);
              }}>
              <View style={[styles.buttonStyle, {height: Theme.height * 0.05}]}>
                <Text style={styles.buttonText}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
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
    marginTop: 20,
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
export default QuestionScreen;
