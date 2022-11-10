import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getToken } from './Common';

// handle the private routes
function PrivateRoute({ children, ...rest }) {
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
                  pathname: '/',
                  state: {from: location} 
                }} 
              />
            )
          )
        }
      />
    )
}

export default PrivateRoute;