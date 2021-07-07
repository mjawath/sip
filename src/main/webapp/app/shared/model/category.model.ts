export interface ICategory {
    id?: number;
    name?: string;
    code?: string;
}

export class Category implements ICategory {
    constructor(public id?: number, public name?: string, public code?: string) {}
}
