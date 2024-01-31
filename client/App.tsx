import React, { useState, useEffect } from 'react';

import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import store from './store';
import type { RootStackParamList } from './types';
import { Fonts, Screens } from './enums';
import { screensConfig } from './screens/screens.config';

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

const loadFonts = async () => {
   await Font.loadAsync({
      [Fonts.MONTSERRAT_MEDIUM]: require('./assets/fonts/Montserrat-Medium.ttf'),
      [Fonts.MONTSERRAT_LIGHT]: require('./assets/fonts/Montserrat-Light.ttf'),
      [Fonts.RUBIK]: require('./assets/fonts/RubikBurned-Regular.ttf'),
   });
};

export default function App() {
   const [appIsReady, setAppIsReady] = useState(false);

   useEffect(() => {
      loadFonts().then(() => {
         setAppIsReady(true);
      });
   }, []);

   if (!appIsReady) return;

   return (
      <Provider store={store}>
         <StatusBar style='auto' />
         <NavigationContainer>
            <StackNavigator.Navigator
               initialRouteName={Screens.POSTS}
               screenOptions={{
                  headerTitleAlign: 'center',
                  headerTitleStyle: styles.navigatorTitleStyle,
               }}
            >
               {screensConfig.map(({ Component, id, name, options }) => (
                  <StackNavigator.Screen
                     key={id}
                     name={name}
                     component={Component}
                     options={{ ...options }}
                  />
               ))}
            </StackNavigator.Navigator>
         </NavigationContainer>
      </Provider>
   );
}

const styles = StyleSheet.create({
   navigatorTitleStyle: {
      fontFamily: Fonts.RUBIK,
   },
});
