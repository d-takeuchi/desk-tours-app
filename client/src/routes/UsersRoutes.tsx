import { Page404 } from '../components/pages/Page404'
import { MyPage } from '../components/pages/users/MyPage'
import { ProfileEdit } from '../components/pages/users/ProfileEdit'

export const UsersRoutes = [
  {
    path: '/:id',
    exact: true,
    children: <MyPage display="myPosts" />,
  },
  {
    path: '/:id/myPosts',
    exact: true,
    children: <MyPage display="myPosts" />,
  },
  {
    path: '/:id/myFavorites',
    exact: true,
    children: <MyPage display="myFavorites" />,
  },
  {
    path: '/edit/:id',
    exact: true,
    children: <ProfileEdit />,
  },
  {
    path: '*',
    exact: false,
    children: <Page404 />,
  },
]
