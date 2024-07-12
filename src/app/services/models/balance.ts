export type Balance = {
    id: string,
    name: string,
    incomingType: IncomingType[];
    expenseType: IncomingType[];
}
export type BalanceAmount = {
    value: number
}
export type BalanceInfo = Balance & BalanceAmount;

export type IncomingType = {
    name: string;
}