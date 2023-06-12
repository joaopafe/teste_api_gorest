import fetch from "node-fetch";
import { buildQuery } from "../../utils";
import { productsSchema } from "../../schemas";
import { IListProducts } from "./interfaces";
import { config } from "../../config/index";

const baseURL = config.basicConfiguration.baseURL;

export class ProductsClient {
    private baseUrl: string = "";

    constructor(baseUrl: string = baseURL){
        this.baseUrl = baseURL;
    }

    public async listProducts(params: IListProducts){
        
    }
}