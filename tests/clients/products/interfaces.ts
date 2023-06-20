export interface IListProductsValid {
    limit?: number,
    offset?: number,
}

export interface IListProductsInvalid{
    limit?: any,
    offset?: any,
}

export interface ICreateProductValid{
    title: string,
    price: number,
    description: string,
    categoryId: number,
    images: string[],
}

export interface IDeleteProductValid{
    id: number,
}