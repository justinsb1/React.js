import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpense, history, wrapper;
// define so that each test case starts with fresh variables. uses these in all the test cases.
beforeEach(() => {
    addExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history}/>);
});

test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot(); 
});

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    // history.push
    expect(history.push).toHaveBeenCalledWith('/');
    // onSubmit
    expect(addExpense).toHaveBeenCalledWith(expenses[1]);
});