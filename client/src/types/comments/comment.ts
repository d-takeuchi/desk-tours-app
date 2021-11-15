export type Comment = {
  id: number;
  postId: number;
  userId: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    createdAt: string;
    email: string;
    icon: string;
    id: number;
    name: string;
    password: string;
    updatedAt: string;
  };
};
