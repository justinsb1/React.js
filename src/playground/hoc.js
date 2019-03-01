// HIGHER ORDER COMPONENTS (HOC) - A component (HOC) that renders another component
// Goal is to reuse code, render hijacking, prop manipulation, abstract state

import React from 'react';
import ReactDOM from 'react-dom';



const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p> 
    </div>
);

// HOC 
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin && <p> This is private info. Please don't share!</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = () => {
    return (props) => (
        <div>
            { props.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                <p> Please login to view the info </p>
            )}
            
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AuthInfo isAdmin={false} info="There are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="There are the details" />, document.getElementById('app'));