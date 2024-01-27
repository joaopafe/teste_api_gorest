import { UsersClient } from "../../clients/users/usersClient";
import { config } from "../../config";
import { createUser } from "../../utils/createUser";

const usersClient = new UsersClient();

describe("Cenário 10 - Remoção de usuários (DELETE /api/v1/users/{id})", () => {
  let idCreated = 0;

  beforeAll(async () => {
    idCreated = await createUser({
      email: config.postUsersValid.email,
      name: config.postUsersValid.name,
      password: config.postUsersValid.password,
      role: config.postUsersValid.role,
      avatar: config.postUsersValid.avatar,
    });
  });

  test("5.1 - Remover usuário por ID através de requisição válida", async () => {
    const response = await usersClient.deleteUser({
      id: idCreated,
    });

    expect(response.status).toEqual(200);
  });

  test("5.2 - Retornar erro para parâmetro 'id' do tipo string não numérica", async () => {
    const response = await usersClient.deleteUser({
      id: "abc",
    });

    expect(response.status).toEqual(404);
  });

  test("5.3 - Retornar erro para parâmetro 'id' não cadastrado", async () => {
    const response = await usersClient.deleteUser({
      id: idCreated,
    });

    expect(response.status).toEqual(404);
  });
});
