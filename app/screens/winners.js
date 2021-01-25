import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  Alert,
  View,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../locale/config-i18n';
import {showMessage} from 'react-native-flash-message';
import LogoComponent from '../components/logo';
import Theme from '../theme';
import api from '../api/api';
import ProfileComponent from '../components/profile';
import AsyncStorage from '@react-native-community/async-storage';

const WinnersScreen = ({route, navigation}) => {
  const {t} = useTranslation();

  const [loading, setLoading] = useState(true);
  const [winners, setWinners] = useState([]);

  const [user, setUser] = useState({});

  React.useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem('USER');
      setUser(JSON.parse(user));
    })();
  }, []);

  const getWinners = async () => {
    try {
      const results = await api
        .get(`/winners/read.php?apikey=${Theme.apikey}`)
        .then((res) => {
          console.log('res: ', res);
          setLoading(false);
          setWinners(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log('winners error');
          Alert.alert(err.message);
          console.log(err);
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
      Alert.alert(err.message);
    }
  };
  React.useEffect(() => {
    getWinners();
  }, []);

  const renderItem = (item) => {
    console.log(item);
    return (
      <View
        style={{
          width: Theme.width * 0.85,
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            color: Theme.whiteColor,

            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {item.item.name}
        </Text>
        <Image
          style={{marginTop: 10, width: Theme.width * 0.85, borderRadius: 25}}
          source={{uri: item.item.image}}
        />
      </View>
    );
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
      <View style={{height: Theme.height * 0.7, marginTop: Theme.height * 0}}>
        <Text
          style={{
            color: Theme.whiteColor,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '500',
          }}>
          The winners are with us
        </Text>

        {winners.length > 0 ? (
          <FlatList
            data={winners}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text
            style={{
              color: Theme.whiteColor,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: Theme.height * 0.2,
            }}>
            No Winner Available
          </Text>
        )}
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
    fontWeight: '500',
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
    fontFamily: Theme.fontFamily,
  },
  textBottom: {
    color: Theme.whiteColor,
    fontFamily: Theme.fontFamily,
    fontSize: Theme.width * 0.035,
  },
});
export default WinnersScreen;
