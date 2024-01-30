import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import store from './store';
import type { RootStackParamList } from './types';
import PostsScreen from './screens/posts.screen';
import SinglePostScreen from './screens/single-post.screen';
import ManagePostScreen from './screens/manage-post.screen';
import { Screens } from './enums';

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

const loadFonts = async () => {
   await Font.loadAsync({
      'Montserrat-medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'Montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
      'Rubik-regular': require('./assets/fonts/RubikBurned-Regular.ttf'),
   });
};

export default function App() {
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      loadFonts().then(() => {
         setIsLoaded(true);
      });
   }, []);

   if (!isLoaded) return;

   return (
      <Provider store={store}>
         <StatusBar style='auto' />
         <NavigationContainer>
            <StackNavigator.Navigator
               initialRouteName={Screens.POSTS}
               screenOptions={{
                  headerTitleAlign: 'center',
                  headerTitleStyle: { fontFamily: 'Rubik-regular' },
               }}
            >
               <StackNavigator.Screen
                  name={Screens.POSTS}
                  component={PostsScreen}
                  options={{ headerTitle: 'All Posts' }}
               />
               <StackNavigator.Screen name={Screens.SINGLE_POST} component={SinglePostScreen} />
               <StackNavigator.Screen
                  name={Screens.MANAGE_POST}
                  component={ManagePostScreen}
                  options={{
                     headerTitle: 'Manage Post',
                     presentation: 'modal',
                     headerBackVisible: false,
                  }}
               />
            </StackNavigator.Navigator>
         </NavigationContainer>
      </Provider>
   );
}
