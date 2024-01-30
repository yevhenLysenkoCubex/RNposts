import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

type CustomTextProps = TextProps & {
   custom?: string;
};

export const CustomText = ({ children, style, ...rest }: CustomTextProps) => {
   return (
      <Text style={[styles.default, style]} {...rest}>
         {children}
      </Text>
   );
};

const styles = StyleSheet.create({
   default: {
      fontFamily: 'Montserrat-light',
   },
});
