export interface IPurchaseOrderLine {
    id?: number;
    qty?: number;
    purchaseOrderId?: number;
    skuId?: number;
}

export class PurchaseOrderLine implements IPurchaseOrderLine {
    constructor(public id?: number, public qty?: number, public purchaseOrderId?: number, public skuId?: number) {}
}
