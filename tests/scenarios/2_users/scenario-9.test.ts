import { UsersClient } from "../../clients/users/usersClient";
import { config } from "../../config";
import { responseErrorSchema, userSchema, usersSchema } from "../../schemas";
import { createUser } from "../../utils/createUser";

const usersClient = new UsersClient();

describe("Cenário 9 - Alteração de usuários (PUT /api/v1/users/{id})", () => {
  let idCreated = 0;

  const emailValid = config.putUsersValid.email;
  const nameValid = config.putUsersValid.name;
  const passwordValid = config.putUsersValid.password;
  const roleValid = config.putUsersValid.role;
  const avatarValid = config.putUsersValid.avatar;

  beforeAll(async () => {
    idCreated = await createUser({
      email: config.postUsersValid.email,
      name: config.postUsersValid.name,
      password: config.postUsersValid.password,
      role: config.postUsersValid.role,
      avatar: config.postUsersValid.avatar,
    });
  });

  test("9.1 - Alterar usuário cadastrado através de requisição válida", async () => {
    const response = await usersClient.updateUser({
      id: idCreated,
      email: emailValid,
      name: nameValid,
      password: passwordValid,
      role: roleValid,
      avatar: avatarValid,
    });

    expect(response.status).toEqual(200);

    const data = await response.json();

    usersSchema.validate(data);
  });

  test("9.2 - Retornar erro de formato para falta de parâmetros obrigatórios", async () => {
    const response = await usersClient.updateUser({});

    expect(response.status).toEqual(404);
  });

  test("9.3 - Retornar erro para parâmetro 'id' do tipo string não numérica", async () => {
    const response = await usersClient.updateUser({
      id: "abc",
      email: emailValid,
      name: nameValid,
      password: passwordValid,
      role: roleValid,
      avatar: avatarValid,
    });

    expect(response.status).toEqual(404);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
    expect(data.statusCode).toEqual(response.status);
  });

  test("9.4 - Retornar erro para parâmetro 'id' não cadastrado", async () => {
    const allUsersResponse = await usersClient.listUsers({
      limit: 0,
    });

    const allUsersData = await allUsersResponse.json();
    const nonExistentId = allUsersData[allUsersData.length - 1] + 1;

    const response = await usersClient.updateUser({
      id: nonExistentId,
      email: emailValid,
      name: nameValid,
      password: passwordValid,
      role: roleValid,
      avatar: avatarValid,
    });

    expect(response.status).toEqual(404);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
    expect(data.statusCode).toEqual(response.status);
  });

  test("9.5 - Retornar erro de formato para parâmetro 'email' vazio", async () => {
    const response = await usersClient.updateUser({
      id: idCreated,
      email: "",
      name: nameValid,
      password: passwordValid,
      role: roleValid,
      avatar: avatarValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
    expect(data.statusCode).toEqual(response.status);
  });

  test("9.6 - Retornar erro de formato para parâmetro 'email' com padrão diferente de e-mail", async () => {
    const response = await usersClient.updateUser({
      id: idCreated,
      email: "emailInvalid",
      name: nameValid,
      password: passwordValid,
      role: roleValid,
      avatar: avatarValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
    expect(data.statusCode).toEqual(response.status);
  });

  test("9.7 - Retornar erro de formato para parâmetro 'name' vazio", async () => {
    const response = await usersClient.updateUser({
      id: idCreated,
      email: emailValid,
      name: "",
      password: passwordValid,
      role: roleValid,
      avatar: avatarValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
    expect(data.statusCode).toEqual(response.status);
  });

  test("9.8 - Retornar erro de formato para parâmetro 'password' com menos de quatro caracteres", async () => {
    const response = await usersClient.updateUser({
      id: idCreated,
      email: emailValid,
      name: nameValid,
      password: "123",
      role: roleValid,
      avatar: avatarValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
    expect(data.statusCode).toEqual(response.status);
  });

  test("9.9 - Retornar erro de formato para parâmetro 'password' com caracteres especiais", async () => {
    const response = await usersClient.updateUser({
      id: idCreated,
      email: emailValid,
      name: nameValid,
      password: "1234$#%abcd",
      role: roleValid,
      avatar: avatarValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
    expect(data.statusCode).toEqual(response.status);
  });

  test("9.10 - Retornar erro de formato para parâmetro 'role' diferente de 'admin' ou 'customer'", async () => {
    const response = await usersClient.updateUser({
      id: idCreated,
      email: emailValid,
      name: nameValid,
      password: passwordValid,
      role: "roleInvalid",
      avatar: avatarValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
    expect(data.statusCode).toEqual(response.status);
  });

  test("9.11 - Retornar erro de formato para parâmetro 'avatar' vazio", async () => {
    const response = await usersClient.updateUser({
      id: idCreated,
      email: emailValid,
      name: nameValid,
      password: passwordValid,
      role: roleValid,
      avatar: "",
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
    expect(data.statusCode).toEqual(response.status);
  });

  test("9.12 - Retornar erro de formato para parâmetro 'avatar' com padrão diferente de URL address", async () => {
    const response = await usersClient.updateUser({
      id: idCreated,
      email: emailValid,
      name: nameValid,
      password: passwordValid,
      role: roleValid,
      avatar: "avatarInvalid",
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
    expect(data.statusCode).toEqual(response.status);
  });
});
