import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./page/Home";
import Admin from "./page/Admin";
import Login from "./components/Connexion/Login";
import Product from "./page/product";
import NotFound from "./page/NotFound";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import ShowComment from "./page/ShowComment";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
function App() {
  return (
    <>
      <NotificationContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/product" component={Product} />
        <Route path="/showcomment/:id" component={ShowComment} />
        <Route path="/:admin/showcomment/:id" component={ShowComment} />
        <PrivateRoute exact path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}
export default App;
