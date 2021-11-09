import { VFC } from "react";
import { Route, Switch } from "react-router-dom";

import MyPage from "../components/pages/users/MyPage";
import Page404 from "../components/pages/Page404";
import PostCreate from "../components/pages/posts/PostCreate";
import PostEdit from "../components/pages/posts/PostEdit";
import PostView from "../components/pages/posts/PostView";
import UserProfileEdit from "../components/pages/users/UserEditProfile";

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
            <Route exact path={`${url}/profile/:id`}>
              <MyPage display="myPosts" />
            </Route>
            <Route exact path={`${url}/profile/:id/myPosts`}>
              <MyPage display="myPosts" />
            </Route>
            <Route exact path={`${url}/profile/:id/myFavorites`}>
              <MyPage display="myFavorites" />
            </Route>
            <Route exact path={`${url}/profile/edit/:id`}>
              <UserProfileEdit />
            </Route>
            <Route exact path={`*`}>
              <Page404 />
            </Route>
          </Switch>
        )}
      />
      <Route path="*" component={Page404} />
    </Switch>
  );
};
