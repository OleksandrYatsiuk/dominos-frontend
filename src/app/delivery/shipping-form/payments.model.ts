export interface Payments {
	label: PaymentTypes;
	value: number;
}
export enum PaymentTypes {
	Cash = 1,
	Card = 2
}