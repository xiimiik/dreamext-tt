import {Comment} from '../types/Comment';
import {Post} from '../types/Post';
import {client} from '../utils/fetchClient';

export const getPosts = () => {
  return client.get<Post[]>('/posts');
};

export const getCommentsByPost = (postId: number) => {
  return client.get<Comment[]>(`/posts/${postId}/comments`);
};
