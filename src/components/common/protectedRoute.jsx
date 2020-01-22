import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const user = auth.currentUser;
  return (
    <Route
      path={path}
      render={routeProps => {
        if (!user)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: routeProps.location }
              }}
            />
          );
        if (Component) return <Component {...routeProps} />;
        return render(routeProps);
      }}
      {...rest}
    />
  );
};

export default ProtectedRoute;
