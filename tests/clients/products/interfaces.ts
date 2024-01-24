export interface IListProducts {
  limit?: number | string;
  offset?: number | string;
}

export interface ICreateProduct {
  title?: string;
  price?: any;
  description?: string;
  categoryId?: any;
  images?: any;
}

export interface IDeleteProduct {
  id: number | string;
}

export interface IListProductsById {
  id: number | any;
}

export interface IUpdateProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[] | any[] | any;
}

export interface IUpdateProductWithoutParams {
  id: any;
}
