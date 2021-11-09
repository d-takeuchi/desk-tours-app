export type Post = {
  id: number;
  title: string;
  description: string;
  imageFile: string;
  createdAt: string;
  updatedAt: string;
  tags: [
    {
      id: number;
      name: string;
    }
  ];
  likesCount: number;
  commentsCount: number;
};
