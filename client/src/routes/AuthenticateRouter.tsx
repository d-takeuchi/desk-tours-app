import { VFC } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Page404 } from '../components/pages/Page404'
import { PostsRoutes } from './PostsRoutes'
import { Layout } from '../components/templates/Layout'
import { UsersRoutes } from './UsersRoutes'

export const AuthenticateRouter: VFC = () => {
  return (
    <Switch>
      <Route
        path="/posts"
        render={({ match: { url } }) => (
          <Switch>
            {PostsRoutes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                <Layout>{route.children}</Layout>
              </Route>
            ))}
          </Switch>
        )}
      />
      <Route
        path="/users"
        render={({ match: { url } }) => (
          <Switch>
            {UsersRoutes.map((route) => (
              <Route
                key={route.path}
                exact={route.exact}
                path={`${url}${route.path}`}
              >
                <Layout>{route.children}</Layout>
              </Route>
            ))}
          </Switch>
        )}
      />
      <Route path="*" component={Page404} />
    </Switch>
  )
}
