import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default {
  mainColor: '#f4801f',
  secondaryColor: '#5CC73C',
  disabledColor: '#C0C0C0',
  whiteColor: '#FFFFFF',
  blackColor: '#000000',
  lightGrey: '#F5F5F5',
  lessGrey: '#e6e6e6',
  grey: 'grey',
  fbColor: '#3b5998',
  fontFamily: 'Hanimation_Arabic_Medium',

  textInputWidth: wp('80%'),
  textInputHeight: height * 0.065,
  textInputFontSize: height * 0.017,
  height: height,
  width: width,
  apikey: 'ZPMlEU8Ickg0usv',
};
