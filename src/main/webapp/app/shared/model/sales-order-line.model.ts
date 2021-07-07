export interface ISalesOrderLine {
    id?: number;
    qty?: number;
    salesOrderId?: number;
    skuId?: number;
}

export class SalesOrderLine implements ISalesOrderLine {
    constructor(public id?: number, public qty?: number, public salesOrderId?: number, public skuId?: number) {}
}
