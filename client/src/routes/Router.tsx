import { VFC } from "react";
import { Route, Switch } from "react-router";
import AuthenticatedGuard from "../components/auth/AuthenticatedGuard";

import Home from "../components/pages/Home";
import Login from "../components/pages/users/Login";
import Page404 from "../components/pages/Page404";
import PostList from "../components/pages/posts/PostList";
import SignUp from "../components/pages/users/SignUp";
import { AuthenticateRouter } from "./AuthenticateRoute";

export const Router: VFC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/posts" component={PostList} />

      {/* ログインしていない場合に、投稿画面等への遷移を阻止 */}
      <AuthenticatedGuard>
        <AuthenticateRouter />
      </AuthenticatedGuard>
      <Route path="*" component={Page404} />
    </Switch>
  );
};
