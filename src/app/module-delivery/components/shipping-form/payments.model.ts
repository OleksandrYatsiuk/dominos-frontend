import { SelectItem } from "primeng/api";

export interface Payments {
	label: PaymentTypes;
	value: number;
}
export enum PaymentTypes {
	Cash = 1,
	Card = 2
}

export const paymentsMap: SelectItem[] = [
	{ label: `categoriesLabels.paymentType.${PaymentTypes.Cash}`, value: PaymentTypes.Cash },
	{ label: `categoriesLabels.paymentType.${PaymentTypes.Card}`, value: PaymentTypes.Card },
]