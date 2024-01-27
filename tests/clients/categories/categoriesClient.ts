import fetch from "node-fetch";
import { buildQuery } from "../../utils";
import { config } from "../../config/index";
import { ICreateCategorie, IListCategories } from "./interfaces";

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

  public async createCategorie(params: ICreateCategorie) {
    const body = JSON.stringify({
      name: params.name,
      image: params.image,
    });

    return fetch(`${this.baseUrl}/api/v1/categories`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
