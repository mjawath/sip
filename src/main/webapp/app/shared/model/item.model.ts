export interface IItem {
    id?: number;
    name?: string;
    code?: string;
    categoryId?: number;
}

export class Item implements IItem {
    constructor(public id?: number, public name?: string, public code?: string, public categoryId?: number) {}
}
