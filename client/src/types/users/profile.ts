import { Like } from "../likes/like";
import { Post } from "../posts/post";

export type Profile = {
  id: number;
  name: string;
  password: string;
  email: string;
  icon: string;
  posts: Post[];
  likes: Like[];
};
