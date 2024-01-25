import fetch from "node-fetch";
import { ICreateUser } from "../clients/users/interfaces";
import { config } from "../config";

export async function createUser(params: ICreateUser) {
  const body = JSON.stringify({
    email: params.email,
    name: params.name,
    password: params.password,
    role: params.role,
    avatar: params.avatar,
  });

  const response = await fetch(
    `${config.basicConfiguration.baseURL}/api/v1/users`,
    {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  expect(response.status).toEqual(201);

  const data = await response.json();

  return data.id;
}
