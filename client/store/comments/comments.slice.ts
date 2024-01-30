import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { CommentsSliceTypes } from './types';
import { RootState } from '..';
import {
   serviceFetchComments,
   serviceCreateComment,
   serviceDeleteComment,
   serviceEditComment,
} from './comments.service';
import { CommentTypes } from '../../types';

const initialState: CommentsSliceTypes = {
   comments: [],
   singleComment: null,
};

export const fetchComments = createAsyncThunk(
   'comments/fetchComments',
   async (postId: string, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceFetchComments();
         dispatch(storeComments({ postId, data: response.data }));
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const asyncCreateComment = createAsyncThunk(
   'comments/asyncCreateComment',
   async (data: CommentTypes, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceCreateComment(data);
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

export const asyncDeleteComment = createAsyncThunk(
   'comments/asyncDeleteComment',
   async (commentId: string, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceDeleteComment(commentId);
         dispatch(deleteComment(response.data));
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const asyncEditComment = createAsyncThunk(
   'comments/asyncEditComment',
   async (data: CommentTypes, { rejectWithValue, dispatch }) => {
      try {
         const response = await serviceEditComment(data);
         dispatch(storeEditedComment(response.data));
         return response.data;
      } catch (error) {
         if (error instanceof Error) {
            return rejectWithValue(error);
         }
         return error;
      }
   },
);

export const commentsSlice = createSlice({
   name: 'commentsSlice',
   initialState,
   reducers: {
      storeComments(state, action: PayloadAction<{ postId: string; data: CommentTypes[] }>) {
         const { postId, data } = action.payload;
         const allPostComments = data.filter((comment) => comment.postId === postId);
         return {
            ...state,
            comments: allPostComments,
         };
      },

      addPostToState(state, action: PayloadAction<CommentTypes>) {
         return {
            ...state,
            comments: [action.payload, ...state.comments],
         };
      },

      deleteComment(state, action: PayloadAction<CommentTypes>) {
         const { id } = action.payload;
         return {
            ...state,
            comments: state.comments.filter((comment) => comment.id !== id),
         };
      },

      storeEditedComment(state, action: PayloadAction<CommentTypes>) {
         const { id } = action.payload;
         const filtered = state.comments.filter((comment) => comment.id !== id);
         return {
            ...state,
            posts: [action.payload, ...filtered],
         };
      },
   },
});

export const { storeComments, addPostToState, deleteComment, storeEditedComment } = commentsSlice.actions;

export const commentsState = (state: RootState) => state.comments;
