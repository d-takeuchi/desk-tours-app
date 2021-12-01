import { VFC } from 'react'
import { useQueryClient } from 'react-query'
import { Redirect, Route, Switch, useLocation } from 'react-router'

import { Login } from '../components/pages/auth/Login'
import { SignUp } from '../components/pages/auth/SignUp'
import { Home } from '../components/pages/Home'
import { Page404 } from '../components/pages/Page404'
import PostList from '../components/pages/posts/PostList'
import { LoginUserInfo } from '../types/types'
import { AuthenticateRouter } from './AuthenticateRouter'

export const Router: VFC = () => {
  const location = useLocation()
  // const { data, isLoading } = useQueryUser()
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<LoginUserInfo>('user')
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/posts" component={PostList} />
      {user ? (
        <AuthenticateRouter />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )}
      <Route path="*" component={Page404} />
    </Switch>
  )
}
