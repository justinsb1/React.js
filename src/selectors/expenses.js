import moment from 'moment';

// GET VISIBLE EXPENSES

const getVisibileExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const createAtMoment = moment(expense.createdAt);
        // checks to see if a start date exists and if it does, was the creation date after the start date
        const startDateMatch = startDate ? startDate.isSameOrBefore(createAtMoment, 'day') : true ;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createAtMoment, 'day') : true;
        // checks to see if the expense text includes the string you are searching for 
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        else if(sortBy === 'amount') {
            // 1 returns the true statement which means b will come first 
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

export default getVisibileExpenses;