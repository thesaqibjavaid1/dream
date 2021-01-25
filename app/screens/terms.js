import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import Theme from '../theme.ts';
import {useTranslation} from 'react-i18next';
import '../locale/config-i18n';
import {showMessage} from 'react-native-flash-message';
import LogoComponent from '../components/logo';
import LocaleButton from '../components/profile';
import AsyncStorage from '@react-native-community/async-storage';

const TermsScreen = ({navigation, route}) => {
  const {t} = useTranslation();
  const [user, setUser] = React.useState({});

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{width: Theme.width * 0.9, alignSelf: 'center'}}>
        <Text style={styles.textBottom}>
          {t('auth:text_term_and_conditions')}
        </Text>
        <Text style={styles.textBottom}>
          تنويه : حملات هذا التطبيق تم الموافقة عليها من قبل الجهات المختصة وهي
          وزارة الصناعة والتجارة والتموين قسم الترويج والجوائز
        </Text>
        <Text style={styles.textBottom}>
          يرجى قراءة الشروط والاحكام والموافقة عليها قبل الدخول بالسحب والاشتراك
        </Text>
        <Text style={styles.textBottom}>
          أولا : أن يكون المشترك قد أتم الثامنة عشر من عمره ثانيا : أن يكون
          المشترك حامل لرقم وطني أردني وأردني الجنسية
        </Text>
        <Text style={styles.textBottom}>
          ثالثا : دفع مبلغ دينار واحد أردني مقابل الاجابة عن السؤال ولشراء صورة
          مميزة لخلفية هاتفك من اختيار المشترك والتي سيتمكن من خلال شراءها
          الدخول للسحب على الجائزة سيارة تويوتا بريوس موديل 2019
        </Text>
        <Text style={styles.textBottom}>
          ابعا : يرجى العلم بأنه على الفائز بالجائزة دفع ضريبة لضريبة الدخل
          مقدارها 15% من قيمة الجائزة
        </Text>
        <Text style={styles.textBottom}>
          اذا لم يتم دفع هذا المبلغ خلال شهر سيتم اعادة السحب لاختيار فائز أخر
        </Text>
        <Text style={styles.textBottom}>
          خامسا : سيتم السحب العشوائي على الفائز من خلال وزارة الصناعة والتجارة
          والتموين قسم الترويج والجوائز عند انتهاء الحملة والعمل على التواصل مع
          الفائز لدفع الضريبة واتمام عملية التنازل عن ملكية السيارة للفائز
        </Text>
      </ScrollView>
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
    //marginTop:100,
  },
  textBottom: {
    color: Theme.whiteColor,
    fontFamily: Theme.fontFamily,
    fontSize: Theme.width * 0.045,
    flexWrap: 'wrap',
  },
});

export default TermsScreen;
