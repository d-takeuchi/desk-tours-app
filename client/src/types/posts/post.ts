import { Comment } from "../comments/comment";
import { Like } from "../likes/like";
import { Tag } from "../tags/tag";

export type Post = {
  id: number;
  title: string;
  description: string;
  imageFile: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  comments: Comment[];
  likes: Like[];
  commentsCount: number;
  likesCount: number;
};
