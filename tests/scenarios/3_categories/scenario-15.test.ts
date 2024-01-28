import { CategoriesClient } from "../../clients/categories/categoriesClient";
import { config } from "../../config";
import { responseErrorSchema } from "../../schemas";

const categoriesClient = new CategoriesClient();

describe("Cenário 15 - Remoção de categorias (DELETE /api/v1/categories/{id})", () => {
  let idCreated = 0;

  beforeAll(async () => {
    const response = await categoriesClient.createCategorie({
      name: config.postCategorieValid.name,
      image: config.postCategorieValid.image,
    });

    expect(response.status).toEqual(201);

    const data = await response.json();
    idCreated = data.id;
  });

  test("15.1 - Remover categoria por ID através de requisição válida", async () => {
    const response = await categoriesClient.deleteCategorie({ id: idCreated });

    expect(response.status).toEqual(204);
  });

  test("15.2 - Retornar erro para parâmetro 'id' do tipo string não numérica", async () => {
    const response = await categoriesClient.deleteCategorie({ id: "abc" });

    expect(response.status).toEqual(404);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });

  test("15.3 - Retornar erro para parâmetro 'id' não cadastrado", async () => {
    const response = await categoriesClient.deleteCategorie({ id: 100000 });

    expect(response.status).toEqual(404);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });
});
