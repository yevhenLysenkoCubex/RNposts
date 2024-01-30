import type { CommentTypes } from '../../types';

export type CommentsSliceTypes = {
   comments: CommentTypes[];
   singleComment: CommentTypes | null;
};
