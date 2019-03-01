

export default (expenses) => {
    if (expenses.length === 0) {
        return 0;
    } else {
        // reduce accumulates the values in an array. Must return an array of numbers using map first.
        return expenses
        .map((expenses) => expenses.amount)
        .reduce((sum, value) => {
            return sum + value;
        }, 0);
    }
};