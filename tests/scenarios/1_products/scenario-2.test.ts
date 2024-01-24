import { ProductsClient } from "../../clients/products/productsClient";
import { config } from "../../config";
import { createProductSchema, responseErrorSchema } from "../../schemas";

const productsClient = new ProductsClient();

describe.skip("Cenário 2 - Criação de produtos (POST /api/v1/products)", () => {
  const titleValid = config.postProductsValid.title;
  const priceValid = config.postProductsValid.price;
  const descriptionValid = config.postProductsValid.description;
  const categoryIdValid = config.postProductsValid.categoryId;
  const imagesValid = config.postProductsValid.images;

  let idCreated = 0;

  test("2.1 - Cadastrar produto através de requisição válida", async () => {
    const response = await productsClient.createProduct({
      title: titleValid,
      price: priceValid,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: imagesValid,
    });

    expect(response.status).toEqual(201);

    const data = await response.json();
    await createProductSchema.validate(data);

    expect(data.title).toBe(titleValid);
    expect(data.price).toBe(priceValid);
    expect(data.description).toBe(descriptionValid);
    expect(data.category.id).toBe(categoryIdValid);

    for (let imageId = 0; imageId < data.images.length; imageId++) {
      expect(data.images[imageId]).toBe(imagesValid[imageId]);
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

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.3 - Retornar erro de formato para parâmetro 'title' vazio", async () => {
    const response = await productsClient.createProduct({
      title: "",
      price: priceValid,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: imagesValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.4 - Retornar erro de formato para parâmetro 'price' com valor zero", async () => {
    const response = await productsClient.createProduct({
      title: titleValid,
      price: 0,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: imagesValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.5 - Retornar erro de formato para parâmetro 'price' com valor negativo", async () => {
    const response = await productsClient.createProduct({
      title: titleValid,
      price: -10,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: imagesValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.6 - Retornar erro de formato para parâmetro 'description' vazio", async () => {
    const response = await productsClient.createProduct({
      title: titleValid,
      price: priceValid,
      description: "",
      categoryId: categoryIdValid,
      images: imagesValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.7 - Retornar erro de formato para parâmetro 'images' vazio", async () => {
    const response = await productsClient.createProduct({
      title: titleValid,
      price: priceValid,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: [],
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.8 - Retornar erro de formato para parâmetro 'images' com padrão diferente de URL address", async () => {
    const response = await productsClient.createProduct({
      title: titleValid,
      price: priceValid,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: ["invalid"],
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("2.9 - Retornar erro de formato para parâmetro 'images' que não seja um array", async () => {
    const response = await productsClient.createProduct({
      title: titleValid,
      price: priceValid,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: imagesValid[0],
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  afterAll(async () => {
    productsClient.deleteProduct({
      id: idCreated,
    });
  });
});
