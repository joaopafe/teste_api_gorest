import { ProductsClient } from "../../clients/products/productsClient";
import { config } from "../../config";
import { productSchema, responseErrorSchema } from "../../schemas";

const productsClient = new ProductsClient();

describe("Cenário 3 - Obtenção de produtos por ID (GET /api/v1/products/{id})", () => {
  let idFetched = 0;
  let idNonExistent = 0;
  const limitMax = 100000;

  beforeAll(async () => {
    const offset = config.getProductsValid.offset;

    const response = await productsClient.listProducts({
      limit: limitMax,
      offset,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();

    idFetched = data[0].id;
    idNonExistent = data[data.length - 1].id + 1;
  });

  test("3.1 - Listar produto por ID através de requisição válida", async () => {
    const response = await productsClient.listProductsById({
      id: idFetched,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();

    await productSchema.validate(data);

    expect(data.id).toEqual(idFetched);
  });

  test("3.2 - Retornar erro de formato para parâmetro 'id' do tipo string não numérica", async () => {
    const response = await productsClient.listProductsById({
      id: "a",
    });

    expect(response.status).toEqual(404);

    const data = await response.json();

    await responseErrorSchema.validate(data);

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("3.3 - Retornar erro para parâmetro 'id' não cadastrado", async () => {
    const response = await productsClient.listProductsById({
      id: idNonExistent,
    });

    expect(response.status).toEqual(404);

    const data = await response.json();

    await responseErrorSchema.validate(data);

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });
});
