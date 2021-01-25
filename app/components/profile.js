import React from 'react';
import {View, Image, Text, TouchableOpacity, Alert} from 'react-native';
import Theme from '../theme';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

const ProfileComponent = (props) => {
  const navigation = useNavigation();

  const logoutUser = () => {
    navigation.dispatch(StackActions.replace('login'));
    setTimeout(() => {
      AsyncStorage.clear();
    }, 2000);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        Alert.alert(
          'User',
          'Which you want to do?',
          [
            {
              text: 'Logout',
              onPress: () => {
                logoutUser();
              },
              style: 'cancel',
            },
            {
              text: 'Open Profile',
              onPress: () => {
                navigation.navigate('profile');
              },
            },
          ],
          {cancelable: false},
        );
      }}>
      <View
        style={{
          paddingHorizontal: 15,
          borderWidth: 1,
          borderColor: Theme.whiteColor,
          borderRadius: 10,
        }}>
        <Image
          style={{
            width: Theme.width * 0.15,
            height: Theme.height * 0.06,
            resizeMode: 'cover',
            borderRadius: 10,
            marginTop: 5,
          }}
          source={{uri: props.user.image}}
        />
        <Text
          style={{
            color: Theme.whiteColor,
            fontSize: 10,
            textAlign: 'center',
            marginBottom: 5,
          }}>
          {props.user.firstname + ' ' + props.user.secondname}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileComponent;
