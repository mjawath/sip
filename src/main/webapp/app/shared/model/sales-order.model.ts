import { ISalesOrderLine } from 'app/shared/model//sales-order-line.model';

export interface ISalesOrder {
    id?: number;
    code?: string;
    lineItems?: ISalesOrderLine[];
}

export class SalesOrder implements ISalesOrder {
    constructor(public id?: number, public code?: string, public lineItems?: ISalesOrderLine[]) {}
}
