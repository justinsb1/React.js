import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';


const store = configureStore();

// // subscribe to track changes it prints the state
// store.subscribe(() => {
//     const state = store.getState();
//     const visibileExpenses = getVisibileExpenses(state.expenses, state.filters);
//     console.log(visibileExpenses);
// });

// // addExpense -> Water bill
// store.dispatch(addExpense({ description: 'Water Bill', amount: 100000, createdAt: 100 }));

// // addExpense -> Gas Bill
// store.dispatch(addExpense({ description: 'Gas Bill', amount: 7900, createdAt: 1000 }));

// store.dispatch(addExpense({ description: 'Rent', amount: 109500, createdAt: 100 }));

// // setTextFilter -> bill
// store.dispatch(setTextFilter( 'water' ));

// getVisibileExpenses -> print visible ones to screen
// console.log(store.getState());

const jsx = (
    <Provider store={store}>  
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx , document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />  , document.getElementById('app'));


// runs when a user goes from unauthenticated to authenticated
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else {    
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});

