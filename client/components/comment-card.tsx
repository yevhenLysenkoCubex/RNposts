import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';

import { type CommentTypes } from '../types';
import { CustomButton } from './custom-button';

type CommentCardProps = CommentTypes & {
   onDelete: () => void;
   onEdit: (data: CommentTypes) => void;
};

export const CommentCard = ({ text, onDelete, onEdit, id, postId }: CommentCardProps) => {
   const inputRef = useRef<TextInput>(null);
   const [editableComment, setEditableComment] = useState(text);
   const [edit, setEdit] = useState(false);

   const handleComment = () => {
      if (!edit) {
         setEdit(true);
      } else {
         onEdit({ id, postId, text: editableComment });
         setEdit(false);
      }
   };

   useEffect(() => {
      if (edit && inputRef.current) {
         inputRef.current.focus();
      }
   }, [edit]);

   return (
      <View style={styles.cardBox}>
         <TextInput
            ref={inputRef}
            style={[styles.input, !edit && styles.disabledInput]}
            value={editableComment}
            editable={edit}
            autoFocus
            multiline
            onChangeText={(text) => setEditableComment(text)}
         />
         <View style={styles.btnsBox}>
            <CustomButton onPress={handleComment}>{edit ? 'Save' : 'Edit'}</CustomButton>
            <CustomButton onPress={onDelete}>
               <Text>Delete</Text>
            </CustomButton>
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
      marginVertical: 8,
      width: '100%',
   },
   btnsBox: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
   },
   input: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      width: '100%',
      padding: 4,
      backgroundColor: '#fff',
   },
   disabledInput: {
      backgroundColor: 'gray',
      color: '#fff',
   },
});
