import { createStore } from 'redux';

//  ACTION GENERATORS - FUNCTIONS THAT RETURN ACTION OBJECTS

// destructuring increment by
const incrementCount = ({ incrementBy = 1 } = {}) =>  ({
    type: 'INCREMENT' ,
    incrementBy: incrementBy
});

// const incrementCount = (payload = {}) => ({ 
//     type: 'INCREMENT' ,
//     incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy: 1
// });

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT' ,
    decrementBy: decrementBy
});

const setCount = ({ count } = {}) => ({
    type: 'SET' ,
    count: count
});

const resetCount = () => ({
    type: 'RESET' 
});

// REDUCERS
// 1. Reducers are pure functions
// 2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {

    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - decrementBy
            };
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default:
            return state;
    }
};
  
// THE STORE IS HOW YOU STORE AND MANIPULATE DATA
const store = createStore(countReducer);

//     if (action.type === 'INCREMENT') {
//         return {
//             count: state.count + 1
//         };
//     } else {
//         return state;
//     }
// });

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});





// // increment the count
// store.dispatch({
//     type: 'INCREMENT' ,
//     incrementBy: 5
// });

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

// store.dispatch({
//     type: 'INCREMENT'
// });

store.dispatch(decrementCount());


store.dispatch(resetCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

// store.dispatch({
//     type: 'SET' ,
//     count: 101
// });

store.dispatch(setCount({ count: 101 }));
