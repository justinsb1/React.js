import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';



const now = moment();
console.log(now.format());



export default class ExpenseForm extends React.Component {
    // only want to use defaults if no data, otherwise use an expense that was passed down and start it off with those values 
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '' ,
            note: props.expense ? props.expense.note : '' ,
            // props.expense.amount stores the total number of cents so we divide by 100 
            amount: props.expense ? (props.expense.amount / 100).toString() : '' ,
            // want to pass the existing timestamp in
            createdAt: props.expense ? moment(props.expense.createdAt) : moment() ,
            calendarFocused: false ,
            error: ''
        };
    }
  
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountchange = (e) => {
        const amount = e.target.value;
        // use string match method to enforce amount input(324.54) with regex code.
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    onSubmit = (e) => {
        // prevents full page refresh
        e.preventDefault();
        if(!this.state.description || !this.state.amount ) {
            // set error state equal to a string
            this.setState(() => ({ error: 'Please provide description and amount.' }));
        } else {
            // clear the error 
            this.setState(() => ({ error: '' }));
            console.log('submitted!');
            this.props.onSubmit({
                description: this.state.description ,
                // float keeps the decimal , parse the amount in base 10 and must multiply by 100
                amount: parseFloat(this.state.amount, 10) * 100 ,
                // must parse date so computer can read it 
                createdAt: this.state.createdAt.valueOf() ,
                note: this.state.note
            });
        }
    };
    render () {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error"> {this.state.error} </p> }
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        className="text-input"
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text"
                        placeholder="Amount"
                        className="text-input"
                        value={this.state.amount}
                        onChange={this.onAmountchange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea 
                    className="textarea"
                    placeholder="Add a note for your expense (optional)"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                    > 
                    </textarea>
                    <div>
                        <button className="button"> Save Expense </button>
                    </div>
            </form>
        )
    }
}