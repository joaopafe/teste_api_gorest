import fetch from "node-fetch";
import { ICreateProduct } from "../clients/products/interfaces";
import { config } from "../config";

export async function createProduct(params: ICreateProduct) {
  const body = JSON.stringify({
    title: params.title,
    price: params.price,
    description: params.description,
    categoryId: params.categoryId,
    images: params.images,
  });

  const response = await fetch(
    `${config.basicConfiguration.baseURL}/api/v1/products`,
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
