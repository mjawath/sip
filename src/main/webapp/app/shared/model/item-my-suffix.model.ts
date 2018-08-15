export interface IItemMySuffix {
    id?: number;
    name?: string;
    code?: string;
    categoryId?: number;
}

export class ItemMySuffix implements IItemMySuffix {
    constructor(public id?: number, public name?: string, public code?: string, public categoryId?: number) {}
}
