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
