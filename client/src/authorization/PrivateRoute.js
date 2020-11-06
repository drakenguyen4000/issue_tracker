//PrivateRoute.js
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  //Destructure properties from props
  //store remaing properties in rest
  // const { component: Component, roles, ...rest } = props;
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        //Not authenicated!
        if (!isAuthenticated) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
        //if user.role not included in roles
        //Send them to a home page
        if (!roles.includes(user.role)) {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
        //If pass both conditions, got to component based on props
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;


