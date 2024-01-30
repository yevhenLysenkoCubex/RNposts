import { api } from '../../api';
import type { CommentTypes } from '../../types';

export const serviceFetchComments = () => {
   return api.get('/comments');
};

export const serviceCreateComment = (data: CommentTypes) => {
   return api.post('/comments', data);
};

export const serviceDeleteComment = (commentId: string) => {
   return api.delete(`/comments/${commentId}`);
};

export const serviceEditComment = (data: CommentTypes) => {
   return api.patch(`/comments/${data.id}`, data);
};
