export type Profile = {
  id: number;
  name: string;
  password: string;
  email: string;
  posts: [
    {
      id: number;
      title: string;
      description: string;
      imageFile: string;
      createdAt: string;
      updatedAt: string;
      likesCount: number;
      commentsCount: number;
    }
  ];
  likes: [
    {
      id: number;
      createdAt: string;
      updatedAt: string;
      post: {
        id: number;
        title: string;
        description: string;
        imageFile: string;
        createdAt: string;
        updatedAt: string;
        likesCount: number;
        commentsCount: number;
      };
      user: {
        id: number;
        name: string;
        password: string;
        email: string;
      };
    }
  ];
};
