import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Theme from '../theme';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const FooterComponent = (props) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  return (
    <TouchableOpacity onPress={() => {}}>
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
          <Text style={styles.textBottom}>{t('auth:text_contact_info')}</Text>
          <Text style={styles.textBottom}>{t('auth:text_about_us')}</Text>
          <Text style={styles.textBottom}>
            {t('auth:text_term_and_conditions')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textBottom: {
    color: Theme.whiteColor,
    fontFamily: Theme.fontFamily,
    fontSize: Theme.width * 0.035,
  },
});

export default FooterComponent;
