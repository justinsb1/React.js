import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';



// rest is used to destructure the rest of the props
export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Redirect to="/dashboard" />      
        ) : (
            <Component {...props}/> 
        )
    )}/>
);



const mapStateToProps = (state) => ({
    // this returns boolean false if not authenticated and boolean true otherwise. cannot return undefined
    isAuthenticated: !!state.auth.uid
});



export default connect(mapStateToProps)(PublicRoute);