import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type CustomButtonProps = {
   children: React.ReactNode;
   onPress: () => void;
   style?: StyleProp<ViewStyle>;
   variant?: 'outlined' | 'contained';
   disabled?: boolean;
};

export const CustomButton = ({
   children,
   onPress,
   style,
   variant = 'contained',
   disabled = false,
}: CustomButtonProps) => {
   return (
      <View style={style}>
         <Pressable
            style={({ pressed }) => [pressed && !disabled && styles.pressed, disabled && styles.disabledBtn]}
            onPress={onPress}
         >
            <View style={[styles.btn, variant === 'contained' ? styles.contained : styles.outlined]}>
               <Text
                  style={[
                     styles.btnText,
                     variant === 'contained' ? styles.containedText : styles.outlinedText,
                  ]}
               >
                  {children}
               </Text>
            </View>
         </Pressable>
      </View>
   );
};

const styles = StyleSheet.create({
   btn: {
      borderRadius: 4,
      padding: 8,
   },
   btnText: {
      textAlign: 'center',
      textTransform: 'uppercase',
      fontFamily: 'Montserrat-medium',
   },
   pressed: {
      opacity: 0.75,
      backgroundColor: 'gray',
      borderRadius: 4,
   },
   outlined: {
      backgroundColor: '#fff',
   },
   contained: {
      backgroundColor: 'gray',
   },
   outlinedText: {
      color: 'gray',
   },
   containedText: {
      color: '#fff',
   },
   disabledBtn: {
      opacity: 0.5,
   },
});
