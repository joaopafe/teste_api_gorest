export interface IListProductsValid {
  limit?: number;
  offset?: number;
}

export interface IListProductsInvalid {
  limit?: any;
  offset?: any;
}

export interface ICreateProductValid {
  title?: string;
  price?: any;
  description?: string;
  categoryId?: any;
  images?: any;
}

export interface IDeleteProductValid {
  id: number;
}

export interface IListProductsByIdValid {
  id: number;
}

export interface IListProductsByIdInvalid {
  id: any;
}

export interface IUpdateProductValid {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface IUpdateProductWithoutParams {
  id: any;
}

export interface IUpdateProductInvalid {
  id: any;
  title: any;
  price: any;
  description: any;
  categoryId: any;
  images: any;
}