export const transactionTypes: { type: string; value: string }[] = [
    { type: "Income", value: "Income" },
    { type: "Expense", value: "Expense"}
];

export const transactionCategories: { [key: string]: string[] } = {
    Income: ["Salary", "Rental Income", "Interest", "Business", "Other"],
    Expense: ["Travel", "Food", "Education", "Shopping", "Rent", "Grocery", "EMI", "Other"]
}
