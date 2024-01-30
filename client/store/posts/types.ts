import { PostTypes } from '../../types';

export type PostsSliceTypes = {
   posts: PostTypes[];
   singlePost: PostTypes | null;
};
