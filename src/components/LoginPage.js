import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';



export const LoginPage = ({ startLogin }) => (
    <div>
        <button onClick={startLogin}>Login</button> 
    </div>
);


// wants to dispatch startLogin
const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

// pass in the component to connect
export default connect(undefined, mapDispatchToProps)(LoginPage);