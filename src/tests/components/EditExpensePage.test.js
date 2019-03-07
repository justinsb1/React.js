import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';


let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    // use spies to define functions
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    // history is an object and push is the spy
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpensePage 
            startEditExpense={startEditExpense}
            startRemoveExpense={startRemoveExpense}
            history={history}
            expense={expenses[2]}
        />
    );
});


// should render EditExpensePage
test('should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
});



// should handle editExpense
test('should handle startEditExpense', () => {
    // find the onSubmit function inside of the ExpenseFrom and it editExpense gets called inside of onSubmit. onSubmit gets called with a expense argument
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2])
    // history.push spy
    expect(history.push).toHaveBeenLastCalledWith('/');
    // editExpense spy
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});



// should handle removeExpense
test('should handle startRemoveExpense', () => {
     // simulate the button being clicked
     wrapper.find('button').simulate('click');
     // history.push spy
     expect(history.push).toHaveBeenLastCalledWith('/');
     // editExpense spy
     expect(startRemoveExpense).toHaveBeenLastCalledWith({
        id: expenses[2].id
    });
});