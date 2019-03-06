import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

// must be able to test unconncected version
export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        // props.dispatch(addExpense(expense));
        this.props.startAddExpense(expense);
         // history.push sends you back to the dashboard page upon submit
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <h1> Add Expense</h1>
                <ExpenseForm 
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    // setup name equal to the action generator 
    startAddExpense: (expense) => dispatch(startAddExpense(expense))   
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);