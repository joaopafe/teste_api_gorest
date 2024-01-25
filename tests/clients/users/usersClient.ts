import fetch from "node-fetch";
import { buildQuery } from "../../utils";
import {
  ICreateUser,
  IDeleteUser,
  IListUserById,
  IListUsers,
} from "./interfaces";
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

  public async createUser(params: ICreateUser) {
    const body = JSON.stringify({
      email: params.email,
      name: params.name,
      password: params.password,
      role: params.role,
      avatar: params.avatar,
    });

    return fetch(`${this.baseUrl}/api/v1/users`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public deleteUser(params: IDeleteUser) {
    return fetch(`${this.baseUrl}/api/v1/users/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async listUsersById(params: IListUserById) {
    return fetch(`${this.baseUrl}/api/v1/users/${params.id}`);
  }
}
