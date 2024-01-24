import fetch from "node-fetch";
import { buildQuery } from "../../utils";
import {
  IListProducts,
  ICreateProduct,
  IDeleteProduct,
  IListProductsById,
  IUpdateProduct,
  IUpdateProductWithoutParams,
} from "./interfaces";
import { config } from "../../config/index";

const baseURL = config.basicConfiguration.baseURL;

export class ProductsClient {
  private baseUrl: string = "";

  constructor(baseUrl: string = baseURL) {
    this.baseUrl = baseUrl;
  }

  public async listProducts(params: IListProducts) {
    const query = buildQuery({
      limit: params.limit,
      offset: params.offset,
    });

    return fetch(`${this.baseUrl}/api/v1/products?${query}`);
  }

  public async createProduct(params: ICreateProduct) {
    const body = JSON.stringify({
      title: params.title,
      price: params.price,
      description: params.description,
      categoryId: params.categoryId,
      images: params.images,
    });

    return fetch(`${this.baseUrl}/api/v1/products`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async deleteProduct(params: IDeleteProduct) {
    const id = params.id;

    return fetch(`${this.baseUrl}/api/v1/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async listProductsById(params: IListProductsById) {
    const id = params.id;

    return fetch(`${this.baseUrl}/api/v1/products/${id}`);
  }

  public async updateProduct(params: IUpdateProduct) {
    const id = params.id;

    const body = JSON.stringify({
      title: params.title,
      price: params.price,
      description: params.description,
      categoryId: params.categoryId,
      images: params.images,
    });

    return fetch(`${this.baseUrl}/api/v1/products/${id}`, {
      method: "PUT",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async updateProductWithoutParams(params: IUpdateProductWithoutParams) {
    const id = params.id;

    const body = JSON.stringify({});

    return fetch(`${this.baseUrl}/api/v1/products/${id}`, {
      method: "PUT",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
