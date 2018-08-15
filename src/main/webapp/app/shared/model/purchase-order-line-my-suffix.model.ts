export interface IPurchaseOrderLineMySuffix {
    id?: number;
    qty?: number;
    purchaseOrderId?: number;
    skuId?: number;
}

export class PurchaseOrderLineMySuffix implements IPurchaseOrderLineMySuffix {
    constructor(public id?: number, public qty?: number, public purchaseOrderId?: number, public skuId?: number) {}
}
