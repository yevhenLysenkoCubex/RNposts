import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import { useAppDispatch } from '../store/hooks';
import { CustomButton } from '../components/custom-button';
import type { ManagePostScreenProps, PostTypes } from '../types';
import { asyncCreatePost, fetchSinglePost, asyncEditPost } from '../store/posts/posts.slice';
import { CustomText } from '../components/custom-text';

const INITIALSTATE = {
   title: '',
   body: '',
   id: '',
};

export default function ManagePostScreen({ navigation, route }: ManagePostScreenProps) {
   const dispatch = useAppDispatch();

   const [hasChanges, setHasChanges] = useState(false);
   const [state, setState] = useState(INITIALSTATE);

   const handleBack = () => {
      navigation.goBack();
      setState(INITIALSTATE);
   };

   const handlePost = async () => {
      if (hasChanges && state.title && state.body) {
         const postDetails = {
            title: state.title,
            body: state.body,
            id: state.id,
         };
         const random = (Math.random() * 646).toFixed(4).toString();
         if (state.id) {
            await dispatch(asyncEditPost({ ...state }));
         } else {
            const randomId = random;
            postDetails.id = randomId;
            await dispatch(asyncCreatePost(postDetails));
         }

         handleBack();
      }
   };

   const handleChangeText = (text: string, state: keyof PostTypes) => {
      setHasChanges(true);
      setState((prev) => ({
         ...prev,
         [state]: text,
      }));
   };

   useLayoutEffect(() => {
      if (route.params?.postId) {
         dispatch(fetchSinglePost(route.params?.postId)).then(({ payload }) => {
            setState({
               title: payload.title,
               body: payload.body,
               id: payload.id,
            });
         });
      }
   }, [route.params?.postId, dispatch]);

   return (
      <View style={styles.container}>
         <View style={styles.inputsWrapper}>
            <View style={styles.inputBox}>
               <CustomText>Title</CustomText>
               <TextInput
                  style={styles.input}
                  value={state.title}
                  onChangeText={(text) => handleChangeText(text, 'title')}
               />
            </View>
            <View style={styles.inputBox}>
               <CustomText>Body</CustomText>
               <TextInput
                  style={styles.input}
                  value={state.body}
                  onChangeText={(text) => handleChangeText(text, 'body')}
               />
            </View>
         </View>
         <CustomButton onPress={handlePost} disabled={!hasChanges || !state.title || !state.body}>
            {state.id ? 'Edit' : 'Create'}
         </CustomButton>
         <CustomButton variant='outlined' onPress={handleBack}>
            Cancel
         </CustomButton>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      padding: 16,
      gap: 16,
   },
   input: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      width: '100%',
      padding: 4,
   },
   inputBox: {
      gap: 4,
   },
   inputsWrapper: {
      gap: 16,
   },
});
