export interface ISKU {
    id?: number;
    name?: string;
    code?: string;
    itemId?: number;
}

export class SKU implements ISKU {
    constructor(public id?: number, public name?: string, public code?: string, public itemId?: number) {}
}
