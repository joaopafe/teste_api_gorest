import fetch from "node-fetch";
import { buildQuery } from "../../utils";
import { IListProducts } from "./interfaces";
import { config } from "../../config/index";

const baseURL = config.basicConfiguration.baseURL;

export class ProductsClient {
    private baseUrl: string = "";

    constructor(baseUrl: string = baseURL){
        this.baseUrl = baseUrl;
    }

    public async listProducts(params: IListProducts){
        const query = buildQuery({
            limit: params.limit,
            offset: params.offset,
        });

        return fetch(`${this.baseUrl}/api/v1/products?${query}`);
    }
}