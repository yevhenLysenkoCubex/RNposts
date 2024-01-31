import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { asyncDeletePost, fetchPosts, postsState } from '../store/posts/posts.slice';
import { PostCard } from '../components/post-card';
import type { PostsScreenProps } from '../types';
import { Screens } from '../enums';
import { CustomButton } from '../components/custom-button';
import { CustomText } from '../components/custom-text';

export default function PostsScreen({ navigation }: PostsScreenProps) {
   const dispatch = useAppDispatch();
   const { posts } = useAppSelector(postsState);

   useLayoutEffect(() => {
      dispatch(fetchPosts());
   }, [dispatch]);

   const handleDeletePost = (postId: string) => {
      dispatch(asyncDeletePost(postId));
   };

   const handleCreatePost = () => {
      navigation.navigate(Screens.MANAGE_POST);
   };

   const navigateToEdit = (postId: string) => {
      navigation.navigate(Screens.MANAGE_POST, { postId });
   };

   const navigateToSinglePost = (postTitle: string, postId: string) => {
      navigation.navigate(Screens.SINGLE_POST, { postTitle, postId });
   };

   return (
      <View style={styles.container}>
         {posts.length === 0 ? (
            <View style={styles.noPostsBox}>
               <CustomText>{'Create your first post'.toUpperCase()}</CustomText>
               <CustomButton onPress={handleCreatePost}>Create First Post</CustomButton>
            </View>
         ) : (
            <FlatList
               data={posts}
               numColumns={2}
               keyExtractor={(post) => post.id.toString()}
               showsVerticalScrollIndicator={false}
               ListFooterComponent={<CustomButton onPress={handleCreatePost}>Create Post</CustomButton>}
               ListHeaderComponent={
                  <CustomText style={styles.listHeaderText}>Click on post title to see more</CustomText>
               }
               renderItem={({ item }) => (
                  <PostCard
                     {...item}
                     onDelete={() => handleDeletePost(item.id)}
                     onEdit={() => navigateToEdit(item.id)}
                     onCardClick={() => navigateToSinglePost(item.title, item.id)}
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
   listHeaderText: {
      textTransform: 'uppercase',
      textAlign: 'center',
   },
});
