import { CategoriesClient } from "../../clients/categories/categoriesClient";
import { config } from "../../config";
import { responseErrorSchema } from "../../schemas";
import { categorieSchema } from "../../schemas/categoriesSchema";

const categoriesClient = new CategoriesClient();

describe("Cenário 12 - Criação de categorias (POST /api/v1/categories)", () => {
  const nameValid = config.postCategorieValid.name;
  const imageValid = config.postCategorieValid.image;

  let idCreated = 0;

  test("12.1 - Cadastrar categoria através de requisição válida", async () => {
    const response = await categoriesClient.createCategorie({
      name: nameValid,
      image: imageValid,
    });

    expect(response.status).toEqual(201);

    const data = await response.json();
    categorieSchema.validate(data);

    expect(data.name).toBe(nameValid);
    expect(data.image).toBe(imageValid);

    idCreated = data.id;
  });

  test("12.2 - Retornar erro de formato para falta de parâmetros obrigatórios", async () => {
    const response = await categoriesClient.createCategorie({});

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });

  test("12.3 - Retornar erro de formato para parâmetro 'name' vazio", async () => {
    const response = await categoriesClient.createCategorie({
      name: "",
      image: imageValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });

  test("12.4 - Retornar erro de formato para parâmetro 'imagem' vazio", async () => {
    const response = await categoriesClient.createCategorie({
      name: nameValid,
      image: "",
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });

  test("12.5 - Retornar erro de formato para parâmetro 'imagem' com padrão diferente de URL address", async () => {
    const response = await categoriesClient.createCategorie({
      name: nameValid,
      image: "imageInvalid",
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
  });

  afterAll(async () => {
    await categoriesClient.deleteCategorie({ id: idCreated });
  });
});
