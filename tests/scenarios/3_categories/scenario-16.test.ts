import { CategoriesClient } from "../../clients/categories/categoriesClient";
import { config } from "../../config";
import { productsSchema, responseErrorSchema } from "../../schemas";

const categoriesClient = new CategoriesClient();

describe("Cenário 16 - Obtenção de produtos por categoria (GET /api/v1/categories/{id}/products)", () => {
  const id = config.getProductsById.id;
  const limit = config.getProductsById.limit;
  const offset = config.getProductsById.offset;

  test("16.1 - Listar produtos por categoria através de requisição válida", async () => {
    const response = await categoriesClient.listProductsById({
      id,
      limit,
      offset,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();
    productsSchema.validate(data);

    for (const product of data) expect(product.category.id).toEqual(id);
  });

  test("16.2 - Retornar lista vazia para requisição com parâmetro 'id' não cadastrado", async () => {
    const response = await categoriesClient.listProductsById({
      id,
      limit,
      offset,
    });

    expect(response.status).toEqual(200);
  });

  test("16.3 - Retornar erro de formato para requisição com parâmetro 'limit' e 'offset' do tipo string não numérica", async () => {
    const response = await categoriesClient.listProductsById({
      id,
      limit: "abc",
      offset: "abc",
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);
  });
});
