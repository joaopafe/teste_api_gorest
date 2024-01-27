import { CategoriesClient } from "../../clients/categories/categoriesClient";
import { config } from "../../config";
import { responseErrorSchema } from "../../schemas";
import { categoriesSchema } from "../../schemas/categoriesSchema";

describe("Cenário 11 - Obtenção de categorias (GET /api/v1/categories)", () => {
  const categoriesClient = new CategoriesClient();

  test("11.1 - Listar categorias através de requisição válida", async () => {
    const response = await categoriesClient.listCategories({
      limit: config.getCategoriesValid.limit,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();
    categoriesSchema.validate(data);
  });

  test("11.2 - Retornar erro de formato para falta de parâmetros obrigatórios", async () => {
    const response = await categoriesClient.listCategories({});

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });

  test("11.3 - Retornar erro para requisição com parâmetro 'limit' do tipo string", async () => {
    const response = await categoriesClient.listCategories({
      limit: "abc",
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });
});
