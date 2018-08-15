import { ISalesOrderLineMySuffix } from 'app/shared/model//sales-order-line-my-suffix.model';

export interface ISalesOrderMySuffix {
    id?: number;
    code?: string;
    lineItems?: ISalesOrderLineMySuffix[];
}

export class SalesOrderMySuffix implements ISalesOrderMySuffix {
    constructor(public id?: number, public code?: string, public lineItems?: ISalesOrderLineMySuffix[]) {}
}
