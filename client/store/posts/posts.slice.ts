import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { PostsSliceTypes } from './types';
import {
   serviceFetchPosts,
   serviceDeletePost,
   serviceCreatePost,
   serviceFetchSinglePost,
   serviceEditPost,
} from './posts.service';
import { PostTypes } from '../../types';

const initialState: PostsSliceTypes = {
   posts: [],
   singlePost: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue, dispatch }) => {
   try {
      const response = await serviceFetchPosts();
      dispatch(storePosts(response.data));
      return response.data;
   } catch (error) {
      if (error instanceof Error) {
         return rejectWithValue(error);
      }
      return error;
   }
});

export const fetchSinglePost = createAsyncThunk(
   'posts/fetchSinglePost',
   async (postId: string, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceFetchSinglePost(postId);
         dispatch(storeSinglePost(response.data));
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const asyncEditPost = createAsyncThunk(
   'posts/asyncEditPost',
   async (data: PostTypes, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceEditPost(data);
         dispatch(storeEditedPost(response.data));
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const asyncDeletePost = createAsyncThunk(
   'posts/deletePost',
   async (postId: string, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceDeletePost(postId);
         dispatch(deletePost(response.data));
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const asyncCreatePost = createAsyncThunk(
   'posts/asyncCreatePost',
   async (data: PostTypes, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceCreatePost(data);
         dispatch(addPostToState(response.data));
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const postsSlice = createSlice({
   name: 'postsSlice',
   initialState,
   reducers: {
      storePosts(state, action: PayloadAction<PostTypes[]>) {
         return {
            ...state,
            posts: action.payload,
         };
      },

      deletePost(state, action: PayloadAction<PostTypes>) {
         const { id } = action.payload;
         return {
            ...state,
            posts: state.posts.filter((post) => post.id !== id),
         };
      },

      addPostToState(state, action: PayloadAction<PostTypes>) {
         return {
            ...state,
            posts: [action.payload, ...state.posts],
         };
      },

      storeSinglePost(state, action: PayloadAction<PostTypes>) {
         return {
            ...state,
            singlePost: action.payload,
         };
      },

      storeEditedPost(state, action: PayloadAction<PostTypes>) {
         const { id } = action.payload;
         const filtered = state.posts.filter((post) => post.id !== id);
         return {
            ...state,
            posts: [action.payload, ...filtered],
         };
      },
   },
});

export const { storePosts, deletePost, addPostToState, storeSinglePost, storeEditedPost } =
   postsSlice.actions;

export const postsState = (state: RootState) => state.posts;
