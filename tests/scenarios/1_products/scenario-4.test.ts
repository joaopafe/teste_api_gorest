import { ProductsClient } from "../../clients/products/productsClient";
import { config } from "../../config";
import { updateProductSchema, responseErrorSchema } from "../../schemas";

const productsClient = new ProductsClient();

describe("Cenário 4 - Alteração de produtos (PUT /api/v1/products/{id})", () => {
  const titleValid = config.postProductsValid.title;
  const priceValid = config.postProductsValid.price;
  const descriptionValid = config.postProductsValid.description;
  const categoryIdValid = config.postProductsValid.categoryId;
  const imagesValid = config.postProductsValid.images;

  let idCreated = 0;

  beforeAll(async () => {
    const response = await productsClient.createProduct({
      title: titleValid,
      price: priceValid,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: imagesValid,
    });

    expect(response.status).toEqual(201);

    const data = await response.json();

    idCreated = data.id;
  });

  test("4.1 - Alterar produto cadastrado através de requisição válida", async () => {
    const response = await productsClient.updateProduct({
      id: idCreated,
      title: titleValid,
      price: priceValid,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: imagesValid,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();
    await updateProductSchema.validate(data);

    expect(data.id).toEqual(idCreated);
    expect(data.title).toBe(titleValid);
    expect(data.price).toBe(priceValid);
    expect(data.description).toBe(descriptionValid);
    expect(data.category.id).toBe(categoryIdValid);

    for (let image = 0; image < data.images.length; image++) {
      expect(data.images[image]).toEqual(imagesValid[image]);
    }
  });

  test("4.2 - Retornar erro de formato para falta de parâmetros obrigatórios", async () => {
    const id = idCreated;

    const response = await productsClient.updateProductWithoutParams({
      id,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    await responseErrorSchema.validate(data);

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("4.3 - Retornar erro de formato para parâmetro 'title' vazio", async () => {
    const response = await productsClient.updateProduct({
      id: idCreated,
      title: "",
      price: priceValid,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: imagesValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.statusCode).toBe(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("4.4 - Retornar erro de formato para parâmetro 'price' com valor zero", async () => {
    const response = await productsClient.updateProduct({
      id: idCreated,
      title: titleValid,
      price: 0,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: imagesValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.statusCode).toBe(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("4.5 - Retornar erro de formato para parâmetro 'price' com valor negativo", async () => {
    const response = await productsClient.updateProduct({
      id: idCreated,
      title: titleValid,
      price: -10,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: imagesValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.statusCode).toBe(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("4.6 - Retornar erro de formato para parâmetro 'description' vazio", async () => {
    const response = await productsClient.updateProduct({
      id: idCreated,
      title: titleValid,
      price: priceValid,
      description: "",
      categoryId: categoryIdValid,
      images: imagesValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.statusCode).toBe(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("4.7 - Retornar erro de formato para parâmetro 'images' vazio", async () => {
    const response = await productsClient.updateProduct({
      id: idCreated,
      title: titleValid,
      price: priceValid,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: [],
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.statusCode).toBe(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("4.8 - Retornar erro de formato para parâmetro 'images' com padrão diferente de URL address", async () => {
    const response = await productsClient.updateProduct({
      id: idCreated,
      title: titleValid,
      price: priceValid,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: [1, 2, 3, 4, 5],
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.statusCode).toBe(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("4.9 - Retornar erro de formato para parâmetro 'images' que não seja um array", async () => {
    const response = await productsClient.updateProduct({
      id: idCreated,
      title: titleValid,
      price: priceValid,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: "",
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    responseErrorSchema.validate(data);

    expect(data.statusCode).toBe(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  afterAll(async () => {
    productsClient.deleteProduct({
      id: idCreated,
    });
  });
});
