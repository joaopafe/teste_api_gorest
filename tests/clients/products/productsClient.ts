import fetch from "node-fetch";
import { buildQuery } from "../../utils";
import {
    IListProductsInvalid,
    IListProductsValid,
    ICreateProductValid,
    IDeleteProductValid,
} from "./interfaces";
import { config } from "../../config/index";

const baseURL = config.basicConfiguration.baseURL;

export class ProductsClient {
    private baseUrl: string = "";

    constructor(baseUrl: string = baseURL){
        this.baseUrl = baseUrl;
    }

    public async listProducts(params: IListProductsValid){
        const query = buildQuery({
            limit: params.limit,
            offset: params.offset,
        });

        return fetch(`${this.baseUrl}/api/v1/products?${query}`);
    }

    public async listProductsInvalid(params: IListProductsInvalid){
        const query = buildQuery({
            limit: params.limit,
            offset: params.offset,
        });

        return fetch(`${this.baseUrl}/api/v1/products?${query}`);
    }

    public async createProduct(params: ICreateProductValid){
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
            }
        });
    }

    public async deleteProduct(params: IDeleteProductValid){
        const id = params.id;

        return fetch(`${this.baseUrl}/api/v1/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
}