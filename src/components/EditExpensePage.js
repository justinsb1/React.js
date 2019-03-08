import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

// Refractor Page to be a class based component to allow us to pull out the inline functions to methods

export class EditExpensePage extends React.Component {
    // setup methods - in class based components we have This.props
    onSubmit = (expense) => {
        // dispatch the action to edit the expense 
        // this.props.dispatch(editExpense(this.props.expense.id, expense));
        // new dispatch line because of mapDispatchToProps defined below
        this.props.startEditExpense(this.props.expense.id, expense);
        // redirect to dashboard page
        this.props.history.push('/');
    };

    onRemove = () => { 
        this.props.startRemoveExpense({ id: this.props.expense.id }); 
        this.props.history.push('/'); 
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title"> Edit Expense </h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onRemove}> Remove Expense </button> 
                </div>
            </div>
        );
    }
};

  
// give component current expense object. search expenses array with an id that matches so HOC component pass props in and we can add new props
const mapStateToProps = (state, props) => {
    return {
        // find allows you to search through an array to find a single item. return true if found item
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;
        })
    }
};

// mapDispatchToProps allow us to extract the reference to the global allowing us to use spies in our test cases
const mapDispatchToProps = (dispatch, props) => {
    return {
        // dispatch whatever comes back from editExpense action generator
        startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
        // removeExpense requires prop so pass it in as second argument
        startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
    };
};

export default connect (mapStateToProps, mapDispatchToProps)(EditExpensePage);