import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, TextInput, SectionList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screens } from '../enums';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { CommentTypes, RootStackParamList } from '../types';
import {
   commentsState,
   fetchComments,
   asyncCreateComment,
   asyncDeleteComment,
   asyncEditComment,
} from '../store/comments/comments.slice';
import { CustomButton } from '../components/custom-button';
import { CommentCard } from '../components/comment-card';
import { CustomText } from '../components/custom-text';

type SinglePostScreenProps = NativeStackScreenProps<RootStackParamList, Screens.SINGLE_POST>;

export default function SinglePostScreen({ route, navigation }: SinglePostScreenProps) {
   const dispatch = useAppDispatch();
   const { comments } = useAppSelector(commentsState);

   const [newComment, setNewComment] = useState('');

   useLayoutEffect(() => {
      dispatch(fetchComments(route.params.postId));
   }, [dispatch, route.params.postId]);

   useLayoutEffect(() => {
      navigation.setOptions({
         title: route.params.postTitle,
      });
   }, [navigation, route.params.postTitle]);

   const handleCreateComment = () => {
      if (!newComment) return;
      const random = (Math.random() * 646).toFixed(4).toString();
      dispatch(
         asyncCreateComment({
            id: random,
            postId: route.params.postId,
            text: newComment,
         }),
      ).then(() => setNewComment(''));
   };

   const handleEditComment = (data: CommentTypes) => {
      dispatch(asyncEditComment(data));
   };

   return (
      <View style={styles.container}>
         {comments.length === 0 ? (
            <View style={styles.noPostsBox}>
               <CustomText>{'No comments yet'.toUpperCase()}</CustomText>
               <TextInput
                  multiline
                  style={[styles.input]}
                  value={newComment}
                  onChangeText={(text) => setNewComment(text)}
               />
               <CustomButton onPress={handleCreateComment} disabled={newComment.length === 0}>
                  Create First Comment
               </CustomButton>
            </View>
         ) : (
            <SectionList
               sections={[{ data: comments }]}
               keyExtractor={(item) => item.id}
               showsVerticalScrollIndicator={false}
               ListFooterComponent={
                  <View style={styles.footerBox}>
                     <TextInput
                        multiline
                        style={[styles.input]}
                        value={newComment}
                        onChangeText={(text) => setNewComment(text)}
                     />
                     <CustomButton onPress={handleCreateComment} disabled={newComment.length === 0}>
                        Add Comment
                     </CustomButton>
                  </View>
               }
               renderItem={({ item }) => (
                  <CommentCard
                     {...item}
                     onDelete={() => dispatch(asyncDeleteComment(item.id))}
                     onEdit={handleEditComment}
                  />
               )}
            />
         )}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingVertical: 4,
      paddingHorizontal: 8,
   },
   noPostsBox: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
   },
   input: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      width: '100%',
      padding: 4,
      backgroundColor: '#fff',
   },
   footerBox: {
      gap: 4,
   },
});
