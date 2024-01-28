import { CategoriesClient } from "../../clients/categories/categoriesClient";
import { config } from "../../config";
import { responseErrorSchema } from "../../schemas";
import { categorieSchema } from "../../schemas/categoriesSchema";

const categoriesClient = new CategoriesClient();

describe("Cenário 14 - Alteração de categorias (PUT /api/v1/categories/{id})", () => {
  const nameValid = config.putCategoriesValid.name;
  const imageValid = config.putCategoriesValid.image;

  let idUpdated = 0;

  beforeAll(async () => {
    const response = await categoriesClient.listCategories({ limit: "0" });

    expect(response.status).toEqual(200);

    const data = await response.json();
    idUpdated = data[0].id;
  });

  test("14.1 - Alterar categoria cadastrada através de requisição válida", async () => {
    const response = await categoriesClient.updateCategorie({
      id: idUpdated,
      name: nameValid,
      image: imageValid,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();
    categorieSchema.validate(data);
  });

  test("14.2 - Retornar erro de formato para parâmetros obrigatórios", async () => {
    const response = await categoriesClient.updateCategorie({});

    expect(response.status).toEqual(404);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });

  test("14.3 - Retornar erro para parâmetro 'id' não cadastrado", async () => {
    const response = await categoriesClient.updateCategorie({
      id: 100000,
      name: nameValid,
      image: imageValid,
    });

    expect(response.status).toEqual(404);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });

  test("14.4 - Retornar erro de formato para parâmetro 'name' vazio", async () => {
    const response = await categoriesClient.updateCategorie({
      id: idUpdated,
      name: "",
      image: imageValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });

  test("14.5 - Retornar erro de formato para parâmetro 'imagem' vazio", async () => {
    const response = await categoriesClient.updateCategorie({
      id: idUpdated,
      name: nameValid,
      image: "",
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });

  test("14.6 - Retornar erro de formato para parâmetro 'imagem' com padrão diferente de URL address", async () => {
    const response = await categoriesClient.updateCategorie({
      id: idUpdated,
      name: nameValid,
      image: "imageInvalid",
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });
});
