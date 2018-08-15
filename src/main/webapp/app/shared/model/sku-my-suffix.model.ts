export interface ISKUMySuffix {
    id?: number;
    name?: string;
    code?: string;
    itemId?: number;
}

export class SKUMySuffix implements ISKUMySuffix {
    constructor(public id?: number, public name?: string, public code?: string, public itemId?: number) {}
}
