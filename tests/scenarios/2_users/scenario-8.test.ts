import { UsersClient } from "../../clients/users/usersClient";

const usersClient = new UsersClient();

describe("Cenário 8 - Obtenção de usuários por ID (POST /api/v1/users/{id})", () => {
  let idFetched = 0;

  beforeAll(async () => {
    const response = await usersClient.listUsers({
      limit: 1,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();

    idFetched = data[0].id;
  });

  test("8.1 - Listar usuário por ID através de requisição válida", async () => {
    const response = await usersClient.listUsersById({ id: idFetched });

    expect(response.status).toEqual(200);
  });

  test("8.2 - Retornar erro de formato para parâmetro 'id' do tipo string não numérica", async () => {
    const response = await usersClient.listUsersById({ id: "abc" });

    expect(response.status).toEqual(404);
  });

  test("8.3 - Retornar erro para parâmetro 'id' não cadastrado", async () => {
    const allUsersResponse = await usersClient.listUsers({ limit: 0 });

    expect(allUsersResponse.status).toEqual(200);

    const allUsersData = await allUsersResponse.json();
    const nonExistentId = allUsersData[allUsersData.length - 1].id + 1;

    const response = await usersClient.listUsersById({ id: nonExistentId });

    expect(response.status).toEqual(404);
  });
});
