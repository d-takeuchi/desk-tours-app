import { VFC } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router'

import { Spinner } from '../components/atoms/Spinner'
import { Login } from '../components/pages/auth/Login'
import { SignUp } from '../components/pages/auth/SignUp'
import { Home } from '../components/pages/Home'
import { Page404 } from '../components/pages/Page404'
import PostList from '../components/pages/posts/PostList'
import { useQueryUser } from '../hooks/useQueryUser'
import { AuthenticateRouter } from './AuthenticateRouter'

export const Router: VFC = () => {
  const location = useLocation()
  const { data, isLoading } = useQueryUser()
  if (isLoading) return <Spinner />
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/posts" component={PostList} />
      {data ? (
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
