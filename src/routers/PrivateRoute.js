import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';


// rest is used to destructure the rest of the props
export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
            <Header />
            <Component {...props}/> 
            </div> 
        ) : (
            <Redirect to="/" />
        )
    )}/>
);



const mapStateToProps = (state) => ({
    // this returns boolean false if not authenticated and boolean true otherwise. cannot return undefined
    isAuthenticated: !!state.auth.uid
});



export default connect(mapStateToProps)(PrivateRoute);