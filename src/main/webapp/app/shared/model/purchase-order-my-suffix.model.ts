import { IPurchaseOrderLineMySuffix } from 'app/shared/model//purchase-order-line-my-suffix.model';

export interface IPurchaseOrderMySuffix {
    id?: number;
    code?: string;
    lineItems?: IPurchaseOrderLineMySuffix[];
}

export class PurchaseOrderMySuffix implements IPurchaseOrderMySuffix {
    constructor(public id?: number, public code?: string, public lineItems?: IPurchaseOrderLineMySuffix[]) {}
}
