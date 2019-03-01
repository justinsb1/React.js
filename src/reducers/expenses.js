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

export default expensesReducer;