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
  comments: [
    {
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
    }
  ];
  likesCount: number;
  commentsCount: number;
};
