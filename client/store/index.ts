import { configureStore, Action, ThunkAction, combineReducers } from '@reduxjs/toolkit';

import { postsSlice } from './posts/posts.slice';
import { commentsSlice } from './comments/comments.slice';

const rootReducer = combineReducers({
   posts: postsSlice.reducer,
   comments: commentsSlice.reducer,
});

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
