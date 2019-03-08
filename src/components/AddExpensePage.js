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
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title"> Add Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    // setup name equal to the action generator 
    startAddExpense: (expense) => dispatch(startAddExpense(expense))   
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);