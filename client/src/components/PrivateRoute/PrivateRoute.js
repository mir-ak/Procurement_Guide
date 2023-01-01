import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "./Auth";
// Restricted route
export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (AuthContext.isAuthenticated() === "true") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
export default PrivateRoute;
