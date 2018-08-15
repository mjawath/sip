export interface ISalesOrderLineMySuffix {
    id?: number;
    qty?: number;
    salesOrderId?: number;
    skuId?: number;
}

export class SalesOrderLineMySuffix implements ISalesOrderLineMySuffix {
    constructor(public id?: number, public qty?: number, public salesOrderId?: number, public skuId?: number) {}
}
