import { ProductsClient } from "../../clients/products/productsClient";
import { config } from "../../config";
import { productsSchema, responseErrorSchema } from "../../schemas";

const productsClient = new ProductsClient();

describe("Cenário 1 - Obtenção de produtos (GET /api/v1/products)", () => {
  const limitValid = config.getProductsValid.limit;
  const offsetValid = config.getProductsValid.offset;

  test("1.1 - Listar produtos através de requisição válida", async () => {
    const response = await productsClient.listProducts({
      limit: limitValid,
      offset: offsetValid,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();
    await productsSchema.validate(data);

    expect(data.length).toEqual(limitValid);
  });

  test("1.2 - Retornar erro de formato para falta de parâmetros obrigatórios", async () => {
    const response = await productsClient.listProducts({});

    expect(response.status).toEqual(400);

    const data = await response.json();
    await responseErrorSchema.validate(data);

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("1.3 - Retornar lista vazia para requisição com parâmetros 'offset' com valor acima do último ID cadastrado", async () => {
    const highLimit = 100000;

    const preRequestResponse = await productsClient.listProducts({
      limit: highLimit,
      offset: 1,
    });

    expect(preRequestResponse.status).toEqual(200);

    const preData = await preRequestResponse.json();
    await productsSchema.validate(preData);

    const higgerId = preData[preData.length - 1].id;

    const response = await productsClient.listProducts({
      limit: highLimit,
      offset: higgerId + 1,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();

    expect(data.length).toBe(undefined);
  });

  test("1.4 - Retornar erro de formato para requisição com parâmetro 'limit' do tipo string", async () => {
    const limitInvalid = config.getProductsInvalid.limit;

    const response = await productsClient.listProducts({
      limit: limitInvalid,
      offset: offsetValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await responseErrorSchema.validate(data);

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("1.5 - Retornar erro de formato para requisição com parâmetro 'offset' do tipo string", async () => {
    const offsetInvalid = config.getProductsInvalid.offset;

    const response = await productsClient.listProducts({
      limit: limitValid,
      offset: offsetInvalid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    await responseErrorSchema.validate(data);

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("1.6 - Retornar erro de formato para requisição com parâmetro 'limit' e 'offset' do tipo string", async () => {
    const limitInvalid = config.getProductsInvalid.limit;
    const offsetInvalid = config.getProductsInvalid.offset;

    const response = await productsClient.listProducts({
      limit: limitInvalid,
      offset: offsetInvalid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();

    await responseErrorSchema.validate(data);

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });
});
