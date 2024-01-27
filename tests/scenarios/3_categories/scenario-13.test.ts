import { CategoriesClient } from "../../clients/categories/categoriesClient";
import { config } from "../../config";
import { responseErrorSchema } from "../../schemas";
import { categorieSchema } from "../../schemas/categoriesSchema";

const categoriesClient = new CategoriesClient();

describe("Cenário 13 - Obtenção de categorias por ID (GET /api/v1/categories/{id})", () => {
  let idFetched = 0;

  beforeAll(async () => {
    const allCategoriesResponse = await categoriesClient.listCategories({
      limit: config.getCategoriesValid.limit,
    });

    expect(allCategoriesResponse.status).toEqual(200);

    const data = await allCategoriesResponse.json();
    idFetched = data[0].id;
  });

  test("13.1 - Listar categoria por ID através de requisição válida", async () => {
    const response = await categoriesClient.listCategorieById({
      id: idFetched,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();
    categorieSchema.validate(data);
  });

  test("13.2 - Retornar erro de formato para parâmetro 'id' do tipo string não numérica", async () => {
    const response = await categoriesClient.listCategorieById({
      id: "abc",
    });

    expect(response.status).toEqual(404);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });

  test("13.3 - Retornar erro para parâmetro 'id' não cadastrado", async () => {
    const allCategoriesResponse = await categoriesClient.listCategories({
      limit: 0,
    });

    expect(allCategoriesResponse.status).toEqual(200);

    const allCategoriesData = await allCategoriesResponse.json();
    const nonExistentId =
      allCategoriesData[allCategoriesData.length - 1].id + 1;

    const response = await categoriesClient.listCategorieById({
      id: nonExistentId,
    });

    expect(response.status).toEqual(404);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });
});
