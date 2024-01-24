import fetch from "node-fetch";
import { buildQuery } from "../../utils";
import { IListUsers } from "./interfaces";
import { config } from "../../config";

const baseURL = config.basicConfiguration.baseURL;

export class UsersClient {
  private baseUrl: string = "";

  constructor(baseUrl: string = baseURL) {
    this.baseUrl = baseUrl;
  }

  public async listUsers(params: IListUsers) {
    const query = buildQuery({
      limit: params.limit,
    });

    return fetch(`${this.baseUrl}/api/v1/users?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
