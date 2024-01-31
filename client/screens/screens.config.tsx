// Todo add correct typization for Component
import ManagePostScreen from './manage-post.screen';
import PostsScreen from './posts.screen';
import SinglePostScreen from './single-post.screen';
import { Screens } from '../enums';
import type { ScreenOptionsTypes, ScreenComponentType } from '../types';

export const screensConfig: Readonly<ScreenOptionsTypes[]> = [
   {
      id: 1,
      name: Screens.POSTS,
      Component: PostsScreen as ScreenComponentType,
      options: {
         headerTitle: 'All Posts',
      },
   },
   {
      id: 2,
      name: Screens.SINGLE_POST,
      Component: SinglePostScreen as ScreenComponentType,
   },
   {
      id: 3,
      name: Screens.MANAGE_POST,
      Component: ManagePostScreen as ScreenComponentType,
      options: {
         headerTitle: 'Manage Post',
         presentation: 'modal',
         headerBackVisible: false,
      },
   },
];
