import { UsersClient } from "../../clients/users/usersClient";
import { config } from "../../config";
import { responseErrorSchema } from "../../schemas";
import { usersSchema } from "../../schemas/usersSchema";

const usersClient = new UsersClient();

describe("Cenário 6 - Obtenção de usuários (GET /api/v1/users)", () => {
  test("6.1 - Listar usuários através de requisição válida", async () => {
    const response = await usersClient.listUsers({
      limit: config.getUsersValid.limit,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();
    usersSchema.validate(data);
  });

  test("6.2 - Retornar erro de formato para falta de parâmetros obrigatórios", async () => {
    const response = await usersClient.listUsers({});

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });

  test("6.3 - Retornar erro para requisição com parâmetro 'limit' do tipo string", async () => {
    const response = await usersClient.listUsers({
      limit: "invalid",
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.statusCode).toEqual(response.status);
    expect(data.message.length >= 1).toBe(true);
  });
});
