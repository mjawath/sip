import { IPurchaseOrderLine } from 'app/shared/model//purchase-order-line.model';

export interface IPurchaseOrder {
    id?: number;
    code?: string;
    lineItems?: IPurchaseOrderLine[];
}

export class PurchaseOrder implements IPurchaseOrder {
    constructor(public id?: number, public code?: string, public lineItems?: IPurchaseOrderLine[]) {}
}
