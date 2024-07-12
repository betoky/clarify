interface ITransaction {
    type: "income" | "expense",
    amount: number,
    date: Date,
    note: string,
}