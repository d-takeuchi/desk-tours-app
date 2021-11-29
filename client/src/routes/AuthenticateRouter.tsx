import { VFC } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Page404 } from '../components/pages/Page404'
import { PostCreate } from '../components/pages/posts/PostCreate'
import { PostEdit } from '../components/pages/posts/PostEdit'
import { PostView } from '../components/pages/posts/PostView'
import { MyPage } from '../components/pages/users/MyPage'
import { ProfileEdit } from '../components/pages/users/ProfileEdit'

export const AuthenticateRouter: VFC = () => {
  return (
    <Switch>
      <Route
        path="/posts"
        render={({ match: { url } }) => (
          <Switch>
            <Route exact path={`${url}/create`}>
              <PostCreate />
            </Route>
            <Route exact path={`${url}/view/:id`}>
              <PostView />
            </Route>
            <Route exact path={`${url}/edit/:id`}>
              <PostEdit />
            </Route>
            <Route exact path={`*`}>
              <Page404 />
            </Route>
          </Switch>
        )}
      />

      <Route
        path="/users"
        render={({ match: { url } }) => (
          <Switch>
            <Route exact path={`${url}/:id`}>
              <MyPage display="myPosts" />
            </Route>
            <Route exact path={`${url}/:id/myPosts`}>
              <MyPage display="myPosts" />
            </Route>
            <Route exact path={`${url}/:id/myFavorites`}>
              <MyPage display="myFavorites" />
            </Route>
            <Route exact path={`${url}/edit/:id`}>
              <ProfileEdit />
            </Route>
            <Route exact path={`*`}>
              <Page404 />
            </Route>
          </Switch>
        )}
      />
      <Route path="*" component={Page404} />
    </Switch>
  )
}
