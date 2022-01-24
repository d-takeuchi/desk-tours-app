import { Page404 } from '../components/pages/Page404'
import { PostCreate } from '../components/pages/posts/PostCreate'
import { PostEdit } from '../components/pages/posts/PostEdit'
import { PostView } from '../components/pages/posts/PostView'

export const PostsRoutes = [
  {
    path: '/create',
    exact: true,
    children: <PostCreate />,
  },
  {
    path: '/view/:id',
    exact: true,
    children: <PostView />,
  },
  {
    path: '/edit/:id',
    exact: true,
    children: <PostEdit />,
  },
  {
    path: '*',
    exact: false,
    children: <Page404 />,
  },
]
