import { string } from "yup";
import { ProductsClient } from "../../clients/products/productsClient";
import { config } from "../../config";
import { createProductSchema, responseErrorSchema } from "../../schemas";

describe("Cenário 2 - Criação de produtos (POST /api/v1/products)", () => {
  const productsClient = new ProductsClient();

  let idCreated = 0;

  test("2.1 - Cadastrar produto através de requisição válida", async () => {
    const title = config.postProductsValid.title;
    const price = config.postProductsValid.price;
    const description = config.postProductsValid.description;
    const categoryId = config.postProductsValid.categoryId;
    const images = config.postProductsValid.images;

    const response = await productsClient.createProduct({
      title,
      price,
      description,
      categoryId,
      images,
    });

    expect(response.status).toEqual(201);

    const data = await response.json();

    await createProductSchema.validate(data);

    expect(data.title).toBe(title);
    expect(data.price).toBe(price);
    expect(data.description).toBe(description);
    expect(data.category.id).toBe(categoryId);

    for (let imageId = 0; imageId < data.images.length; imageId++) {
      expect(data.images[imageId]).toBe(images[imageId]);
    }

    const idCreated = data.id;

    await productsClient.deleteProduct({
      id: idCreated,
    });
  });

  test("2.2 - Retornar erro de formato para falta de parâmetros obrigatórios", async () => {
    const response = await productsClient.createProduct({});

    expect(response.status).toEqual(400);

    const data = await response.json();

    await responseErrorSchema.validate(data);

    expect(data.statusCode).toEqual(400);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.3 - Retornar erro de formato para parâmetro 'title' vazio", async () => {
    const price = config.postProductsValid.price;
    const description = config.postProductsValid.description;
    const categoryId = config.postProductsValid.categoryId;
    const images = config.postProductsValid.images;

    const response = await productsClient.createProduct({
      title: "",
      price,
      description,
      categoryId,
      images,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(400);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.4 - Retornar erro de formato para parâmetro 'price' com valor zero", async () => {
    const title = config.postProductsValid.title;
    const description = config.postProductsValid.description;
    const categoryId = config.postProductsValid.categoryId;
    const images = config.postProductsValid.images;

    const response = await productsClient.createProduct({
      title,
      price: 0,
      description,
      categoryId,
      images,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(400);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.5 - Retornar erro de formato para parâmetro 'price' com valor negativo", async () => {
    const title = config.postProductsValid.title;
    const description = config.postProductsValid.description;
    const categoryId = config.postProductsValid.categoryId;
    const images = config.postProductsValid.images;

    const response = await productsClient.createProduct({
      title,
      price: -10,
      description,
      categoryId,
      images,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(400);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.6 - Retornar erro de formato para parâmetro 'price' do tipo string", async () => {
    const title = config.postProductsValid.title;
    const description = config.postProductsValid.description;
    const categoryId = config.postProductsValid.categoryId;
    const images = config.postProductsValid.images;

    const response = await productsClient.createProduct({
      title,
      price: "100",
      description,
      categoryId,
      images,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(400);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.7 - Retornar erro de formato para parâmetro 'description' vazio", async () => {
    const title = config.postProductsValid.title;
    const price = config.postProductsValid.price;
    const categoryId = config.postProductsValid.categoryId;
    const images = config.postProductsValid.images;

    const response = await productsClient.createProduct({
      title,
      price,
      description: "",
      categoryId,
      images,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(400);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.8 - Retornar erro de formato para parâmetro 'categoryId' com valor negativo", async () => {
    const title = config.postProductsValid.title;
    const price = config.postProductsValid.price;
    const description = config.postProductsValid.description;
    const images = config.postProductsValid.images;

    const response = await productsClient.createProduct({
      title,
      price,
      description,
      categoryId: -1,
      images,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(400);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.9 - Retornar erro de formato para parâmetro 'categoryId' do tipo string", async () => {
    const title = config.postProductsValid.title;
    const price = config.postProductsValid.price;
    const description = config.postProductsValid.description;
    const images = config.postProductsValid.images;

    const response = await productsClient.createProduct({
      title,
      price,
      description,
      categoryId: "1",
      images,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(400);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.10 - Retornar erro de formato para parâmetro 'images' vazio", async () => {
    const title = config.postProductsValid.title;
    const price = config.postProductsValid.price;
    const description = config.postProductsValid.description;
    const categoryId = config.postProductsValid.categoryId;

    const response = await productsClient.createProduct({
      title,
      price,
      description,
      categoryId,
      images: [],
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(400);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.11 - Retornar erro de formato para parâmetro 'images' com padrão diferente de URL address", async () => {
    const title = config.postProductsValid.title;
    const price = config.postProductsValid.price;
    const description = config.postProductsValid.description;
    const categoryId = config.postProductsValid.categoryId;

    const response = await productsClient.createProduct({
      title,
      price,
      description,
      categoryId,
      images: ["invalid"],
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(400);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.12 - Retornar erro de formato para parâmetro 'images' que não seja um array", async () => {
    const title = config.postProductsValid.title;
    const price = config.postProductsValid.price;
    const description = config.postProductsValid.description;
    const categoryId = config.postProductsValid.categoryId;

    const response = await productsClient.createProduct({
      title,
      price,
      description,
      categoryId,
      images: "https://picsum.photos/640/640?r=5315",
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(400);
    expect(data.message.length >= 1).toBe(true);
  });

  afterAll(async () => {
    productsClient.deleteProduct({
      id: idCreated,
    });
  });
});
