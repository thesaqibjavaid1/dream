import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoadingScreen from './screens/loading';
import LoginScreen from './screens/login';
import SignUpScreen from './screens/signup';
import MainScreen from './screens/main';
import ScratchCodeScreen from './screens/scratchcode';
import ScratchCodeSuccessScreen from './screens/scratchcodeSuccess';
import WinnersScreen from './screens/winners';
import DrawWeekScreen from './screens/drawWeek';
import CompetitionScreen from './screens/competition';
import TermsScreen from './screens/terms';
import ProfileScreen from './screens/profile';
import ContactScreen from './screens/contact';
import QuestionScreen from './screens/question';

const Stack = createStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="loading" component={LoadingScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={SignUpScreen} />
        <Stack.Screen name="main" component={MainScreen} />
        <Stack.Screen name="scratch" component={ScratchCodeScreen} />
        <Stack.Screen name="winners" component={WinnersScreen} />
        <Stack.Screen name="drawweek" component={DrawWeekScreen} />
        <Stack.Screen name="competition" component={CompetitionScreen} />
        <Stack.Screen name="terms" component={TermsScreen} />
        <Stack.Screen name="profile" component={ProfileScreen} />
        <Stack.Screen name="contact" component={ContactScreen} />
        <Stack.Screen name="question" component={QuestionScreen} />
        <Stack.Screen
          name="scratchSuccess"
          component={ScratchCodeSuccessScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
