import { ProductsClient } from "../../clients/products/productsClient";
import { config } from "../../config";
import { createProduct } from "../../utils/createProduct";

const productsClient = new ProductsClient();

describe("Cenário 5 - Remoção de produtos (DELETE /api/v1/products/{id})", () => {
  const titleValid = config.postProductsValid.title;
  const priceValid = config.postProductsValid.price;
  const descriptionValid = config.postProductsValid.description;
  const categoryIdValid = config.postProductsValid.categoryId;
  const imagesValid = config.postProductsValid.images;

  let idCreated = 0;

  beforeAll(async () => {
    idCreated = await createProduct({
      title: titleValid,
      price: priceValid,
      description: descriptionValid,
      categoryId: categoryIdValid,
      images: imagesValid,
    });
  });

  test("5.1 - Remover produto por ID através de requisição válida", async () => {
    const response = await productsClient.deleteProduct({
      id: idCreated,
    });

    expect(response.status).toEqual(200 | 204);
  });

  test("5.2 - Retornar erro para parâmetro 'id' do tipo string não numérica", async () => {
    const response = await productsClient.deleteProduct({
      id: "idInvalid",
    });

    expect(response.status).toEqual(400);
  });

  test("5.3 - Retornar erro para parâmetro 'id' não cadastrado", async () => {
    const response = await productsClient.deleteProduct({
      id: idCreated,
    });

    expect(response.status).toEqual(404);
  });
});
