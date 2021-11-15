import { Post } from "../posts/post";

export type Like = {
  id: number;
  postId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  post: Post;
  user: {
    id: number;
    name: string;
    password: string;
    email: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
  };
};
