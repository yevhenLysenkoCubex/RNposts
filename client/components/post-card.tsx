import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import { PostTypes } from '../types';
import { CustomButton } from './custom-button';
import { CustomText } from './custom-text';

type PostCardProps = PostTypes & {
   onDelete: () => void;
   onEdit: () => void;
   onCardClick: () => void;
};

export const PostCard = ({ body, onEdit, title, onDelete, onCardClick }: PostCardProps) => {
   return (
      <View style={styles.cardBox}>
         <Pressable onPress={onCardClick}>
            <CustomText>{title}</CustomText>
            <CustomText>{body}</CustomText>
         </Pressable>
         <View style={styles.btnsBox}>
            <CustomButton onPress={onEdit}>Edit</CustomButton>
            <CustomButton onPress={onDelete}>Delete</CustomButton>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   cardBox: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 8,
      alignItems: 'center',
      backgroundColor: '#fff',
      gap: 32,
      flex: 1,
      margin: 8,
      maxWidth: '45%',
   },
   btnsBox: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
   },
});
