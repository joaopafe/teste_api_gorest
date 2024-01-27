import fetch from "node-fetch";
import { buildQuery } from "../../utils";
import { config } from "../../config/index";
import { IListCategories } from "./interfaces";

const baseURL = config.basicConfiguration.baseURL;

export class CategoriesClient {
  private baseUrl: string = "";

  constructor(baseUrl: string = baseURL) {
    this.baseUrl = baseUrl;
  }

  public async listCategories(params: IListCategories) {
    const query = buildQuery({
      limit: params.limit,
    });

    return fetch(`${this.baseUrl}/api/v1/categories?${query}`);
  }
}
