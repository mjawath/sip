export interface ICategoryMySuffix {
    id?: number;
    name?: string;
    code?: string;
}

export class CategoryMySuffix implements ICategoryMySuffix {
    constructor(public id?: number, public name?: string, public code?: string) {}
}
