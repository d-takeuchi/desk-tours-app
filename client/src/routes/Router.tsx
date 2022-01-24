import { VFC } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router'

import { Login } from '../components/pages/auth/Login'
import { SignUp } from '../components/pages/auth/SignUp'
import { Home } from '../components/pages/Home'
import { Page404 } from '../components/pages/Page404'
import { PostList } from '../components/pages/posts/PostList'
import { Layout } from '../components/templates/Layout'
import { useQueryUser } from '../hooks/useQueryUser'
import { AuthenticateRouter } from './AuthenticateRouter'

export const Router: VFC = () => {
  const location = useLocation()
  const { data: user } = useQueryUser()
  return (
    <Switch>
      <Route exact path="/">
        <Layout>
          <Home />
        </Layout>
      </Route>
      <Route exact path="/login">
        <Layout>
          <Login />
        </Layout>
      </Route>
      <Route exact path="/sign-up">
        <Layout>
          <SignUp />
        </Layout>
      </Route>
      <Route exact path="/posts">
        <Layout>
          <PostList />
        </Layout>
      </Route>
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
