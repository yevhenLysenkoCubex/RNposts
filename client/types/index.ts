import { ComponentType } from 'react';
import { NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screens } from '../enums';

export type PostTypes = {
   id: string;
   body: string;
   title: string;
};

export type CommentTypes = {
   id: string;
   postId: string;
   text: string;
};

export type RootStackParamList = {
   [Screens.POSTS]: undefined;
   [Screens.SINGLE_POST]: { postTitle: string; postId: string };
   [Screens.MANAGE_POST]: { postId: string } | undefined;
};

export type ScreenOptionsTypes = {
   id: number;
   name: Screens;
   Component: ScreenComponentType;
   options?: NativeStackNavigationOptions;
};

export type ScreenComponentType = ComponentType<NativeStackScreenProps<RootStackParamList, Screens>>;

export type ManagePostScreenProps = NativeStackScreenProps<RootStackParamList, Screens.MANAGE_POST>;
export type PostsScreenProps = NativeStackScreenProps<RootStackParamList, Screens.POSTS>;
export type SinglePostScreenProps = NativeStackScreenProps<RootStackParamList, Screens.SINGLE_POST>;
