import { ProductsClient } from "../../clients/products/productsClient";
import { config } from "../../config";
import { productsSchema } from "../../schemas";

describe("Cenário 1 - Obtenção de produtos (GET /api/v1/products)", () => {
    const productsClient = new ProductsClient

    test("1.1 - Listar produtos através de requisição válida", async () => {
        const limit = config.getProducts.limit;
        const offset = config.getProducts.offset;

        const response = await productsClient.listProducts({
            limit,
            offset,
        });

        expect(response.status).toEqual(200);

        const data = await response.json();

        await productsSchema.validate(data);
        
        expect(data.length).toEqual(limit);
    });

    test("1.2 - Retornar erro de formato para falta de parâmetros obrigatórios", () => {});

    test("1.3 - Retornar lista vazia para requisição com parâmetros 'limit' e 'offset' acima do valor limite", () => {});

    test("1.4 - Retornar erro de formato para requisição com parâmetro 'limit' do tipo string", () => {});

    test("1.5 - Retornar erro de formato para requisição com parâmetro 'offset' do tipo string", () => {});

    test("1.6 - Retornar erro de formato para requisição com parâmetro 'limit' e 'offset' do tipo string", () => {});
});