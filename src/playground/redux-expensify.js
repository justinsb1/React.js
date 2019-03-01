import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ACTIONS = addExpense, removeExpense, editExpense, setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE' ,
    expense: {
        id: uuid() ,
        description: description ,
        note: note ,
        amount: amount , 
        createdAt : createdAt
    }
});

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE' ,
    id: id
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE' ,
    id: id ,
    updates: updates
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER' ,
    text: text
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE' 
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE' ,
    startDate: startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE' ,
    endDate: endDate
});



// EXPENSES REDUCER
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
                // concat doesn't change the array like push does but lets use the spread operator, same as concat
            return  [
            ...state, action.expense
          ];    
        case 'REMOVE_EXPENSE':
                // filter returns new array with subset of values. doesn't change the original array
            return state.filter(({ id }) => {
                // if id is not equal to id we want to remove then we will keep it in the array
                return id !== action.id;
          });
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        // return a new object using the spread operator so you the old properties still exist
                        ...expense ,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
        default: 
            return state;
    }
};

// FILTERS REDUCERS
const filtersReducerDefaultState = {
    text: '' ,
    sortBy: 'date' , // date or amount
    startDate: undefined ,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state ,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state ,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state ,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state ,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state ,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

// GET VISIBLE EXPENSES
const getVisibileExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        // checks to see if a start date exists and if it does, was the creation date after the start date
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;;
        // checks to see if the expense text includes the string you are searching for 
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        else if(sortBy === 'amount') {
            // 1 returns the true statement which means b will come first 
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

// STORE CREATION

const store = createStore(
    combineReducers({
        expenses: expensesReducer ,
        filters: filtersReducer
    })
);

// subscribe to track changes it prints the state
store.subscribe(() => {
    const state = store.getState();
    const visibileExpenses = getVisibileExpenses(state.expenses, state.filters);
    console.log(visibileExpenses);
});

// timestamp startdate is default January 1st, 1970

const expenseOne = store.dispatch(addExpense({ description: 'rent' , amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'coffee' , amount: 300, createdAt: -1000 }));

// // allows you to remove any expense
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// // allows you to edit any expense
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// // allows you to filter any expense
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

// // allows you to sort expense by amount
store.dispatch(sortByAmount());

// // allows you to sort expense by date
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

//console.log(store.getState());

const demoState = {
    expenses: [{
        id: 'doafiajeo' ,
        description: 'January Rent' ,
        note: 'This was the final payment for that address' ,
        amount: 54500 ,
        createdAt: 0
    }] ,
    filters: {
        text: 'rent' ,
        sortBy: 'amount' , // date or amount
        startDate: undefined ,
        endDate: undefined
    }
};

