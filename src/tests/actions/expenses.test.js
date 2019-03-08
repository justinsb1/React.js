import { addExpense, startAddExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

// create configuration so we call over and over in our test cases so they all create the same mock store
const createMockStore = configureMockStore([thunk]);

const uid = 'thisismytestuid';

const defaultAuthState = { auth: { uid } };

// get the test data
beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    // doesn't allow beforeEach to run until Firebase has synced all the data
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE' ,
        id: '123abc'
    });
});

// asyn action
test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: id
        });
        // fetch the data.
        // get the value just a single time
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        // when you use snapshot.val on an item that doesn't exist, get null back
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'New note value' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE' ,
        id: '123abc' ,
        updates: {
            note: 'New note value'
        }
    });
});

test('should edit expense from firebase', () => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = { amount: 21045 };
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    })
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE' ,
        expense: expenses[2]
    });
});

// test('should setup add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE' ,
//         expense: {
//             id: expect.any(String) ,
//             description: '' ,
//             note: '' ,
//             amount: 0 ,
//             createdAt: 0
//         }
//     });
// });

// wont be considered success or failure until after we call done
test('should add expense to database and store', (done) => {
    // create a mock store
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This is a better mouse',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        // returns an array of all of the actions. 
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String) ,
                ...expenseData
            }
        });

        // database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) =>{
        //     expect(snapshot.val()).toEqual(expenseData);
        //     done();

        // this is the promise
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
    });
});

test('should add expense with defaults to database and store', (done) => {

      // create a mock store
      const store = createMockStore(defaultAuthState);
      const expenseDefaults = {
          description: '',
          amount: 0,
          note: '',
          createdAt: 0
      };
  
      store.dispatch(startAddExpense({})).then(() => {
          // returns an array of all of the actions. 
          const actions = store.getActions();
          expect(actions[0]).toEqual({
              type: 'ADD_EXPENSE',
              expense: {
                  id: expect.any(String) ,
                  ...expenseDefaults
              }
          });
  
          // this is the promise
          return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
          }).then((snapshot) => {
              expect(snapshot.val()).toEqual(expenseDefaults);
              done();
      });

});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    // use toEqual to compare two objects
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    // requires Asynchronous functionality
    const store = createMockStore(defaultAuthState);
    // dispatch startSetExpenses. don't want the test cases to be done until firebase updates
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});