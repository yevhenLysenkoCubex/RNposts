import { api } from '../../api';
import type { PostTypes } from '../../types';

export const serviceFetchPosts = () => {
   return api.get('/posts');
};

export const serviceDeletePost = (postId: string) => {
   return api.delete(`/posts/${postId}`);
};

export const serviceFetchSinglePost = (postId: string) => {
   return api.get(`/posts/${postId}`);
};

export const serviceCreatePost = (data: PostTypes) => {
   return api.post(`/posts`, data);
};

export const serviceEditPost = (data: PostTypes) => {
   return api.patch(`/posts/${data.id}`, data);
};
