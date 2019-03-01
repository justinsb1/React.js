import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

// Have to export unconnected ExpenseList to use in test case files
export const ExpenseList = (props) => (
    <div>
        <h1> Expense List</h1>
        {
            props.expenses.length === 0 ? (
                <p> No expenses </p>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense} />;
                })
            )
        }
    </div>
);

// Higher Order Component, the function inside of connect determines what information from the store we want our component to access
// const ConnectedExpenseList = connect((state) => {
//     return {
//         expenses: state.expenses
//     };
// })(ExpenseList);

// export default ConnectedExpenseList;

// maps store state to component props
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);