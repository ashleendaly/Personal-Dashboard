import React from 'react';
import { Route, Navigate } from "react-router-dom";
import { getToken } from "./Common";

// handle the public routes
function PublicRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={
          ({ location }) => (
            !getToken() ? (
              children
            ) : ( 
              <Navigate 
                to={{ 
                  pathname: '/dashboard',
                  state: {from: location} 
                }} 
              />
            )
          )
        }
      />
    )
}

export default PublicRoute;