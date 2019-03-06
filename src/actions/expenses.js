import uuid from 'uuid';
import database from '../firebase/firebase';

// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

// TO RUN FIREBASE CODE
// component calls action generator
// action generator returns function
// component dispatches function
// function runs (has the ability to dispatch other actions and do whatever it wants)




// STORE ACTION GENERATORS FOR EXPENSES

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE' ,
    expense: expense
});

// start the process to dispatch ADD_EXPENSE inside of the function we'll be setting up
export const startAddExpense = (expenseData = {}) => {
    // return a function. only will work because of the middleware set up by Thunk
    return (dispatch) => {
        // define defaults
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = { description, note, amount, createdAt };

        return database.ref('expenses').push(expense)
        .then((ref) => {
            dispatch(addExpense({
                id: ref.key ,
                ...expense
            }));
        });
    };
};

export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE' ,
    id: id
});

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE' ,
    id: id ,
    updates: updates
});