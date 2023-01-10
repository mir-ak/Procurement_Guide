import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./page/Home";
import Admin from "./page/Admin";
import Login from "./components/Connection/Login";
import Product from "./page/product";
import Contact from "./page/Contact";
import NotFound from "./page/NotFound";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import ShowAndAddComment from "./page/ShowAndAddComment";
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
        <Route exact path="/contact" component={Contact} />
        <Route
          path="/showcomments/:category/:id"
          component={ShowAndAddComment}
        />
        <PrivateRoute
          path="/:admin/showcomments/:category/:id"
          component={ShowAndAddComment}
        />
        <PrivateRoute exact path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}
export default App;
