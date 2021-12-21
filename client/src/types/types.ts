export interface CsrfToken {
  csrf_token: string
}

export interface LoginData {
  email: string
  password: string
}

export interface SignUpData {
  name: string
  email: string
  password: string
}

export interface LoginUserInfo {
  id: number
  name: string
  password: string
  email: string
  icon: string
  posts: Post[]
  likes: Like[]
}

export interface User {
  id: number
  name: string
  password: string
  email: string
  icon: string
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: number
  name: string
}

export interface Post {
  id: number
  title: string
  description: string
  imageFileUrl: string
  createdAt: string
  updatedAt: string
  userId: number
  tags: Tag[]
  comments: Comment[]
  likes: Like[]
  commentsCount: number
  likesCount: number
  items: Item[]
}

export interface Like {
  id: number
  postId: number
  userId: number
  createdAt: string
  updatedAt: string
  post: Post
  user: User
}

export interface Comment {
  id: number
  postId: number
  userId: number
  comment: string
  createdAt: string
  updatedAt: string
  user: User
}

export interface UpdatePostData {
  id: number
  title: string
  imageFile: string
  description: string
  tagIds: number[]
}

export interface CreatePostData {
  title: string
  imageFile: string
  description: string
  tagIds: number[]
  items: Item[]
}

export interface CommentData {
  comment: string
  userId: number
  postId: number
}

export interface UpdateUserData {
  id: string
  name: string
  icon: string
}

export interface SearchParams {
  title: string
}

export interface FavoriteData {
  userId?: number
  postId?: number
}

export interface GoogleLoginData {
  email: string
  familyName: string
  givenName: string
  googleId: string
  imageUrl: string
  name: string
}

export interface Item {
  id: string
  name: string
  url: string
  imageUrl: string
  price: number
}
