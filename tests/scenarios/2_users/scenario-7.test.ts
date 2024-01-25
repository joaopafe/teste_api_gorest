import { UsersClient } from "../../clients/users/usersClient";
import { config } from "../../config";
import { responseErrorSchema, userSchema } from "../../schemas";

const usersClient = new UsersClient();

describe("Cenário 7 - Criação de usuários(POST /api/v1/users/{id})", () => {
  const emailValid = config.postUsersValid.email;
  const nameValid = config.postUsersValid.name;
  const passwordValid = config.postUsersValid.password;
  const roleValid = config.postUsersValid.role;
  const avatarValid = config.postUsersValid.avatar;

  let idCreated = 0;

  test("7.1 - Cadastrar usuário através de requisição válida", async () => {
    const response = await usersClient.createUser({
      email: emailValid,
      name: nameValid,
      password: passwordValid,
      role: roleValid,
      avatar: avatarValid,
    });

    expect(response.status).toEqual(201);

    const data = await response.json();
    userSchema.validate(data);

    expect(data.email).toBe(emailValid);
    expect(data.password).toBe(passwordValid);
    expect(data.name).toBe(nameValid);
    expect(data.role).toBe(roleValid);
    expect(data.avatar).toBe(avatarValid);

    idCreated = data.id;
  });

  test("7.2 - Retornar erro de formato para falta de parâmetros obrigatórios", async () => {
    const response = await usersClient.createUser({});

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
    expect(data.statusCode).toEqual(response.status);
  });

  test("7.2 - Retornar erro de formato para parâmetro 'email' vazio", async () => {
    const response = await usersClient.createUser({
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

  test("7.3 - Retornar erro de formato para parâmetro 'email' com padrão diferente de e-mail", async () => {
    const response = await usersClient.createUser({
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

  test("7.4 - Retornar erro de formato para parâmetro 'name' vazio", async () => {
    const response = await usersClient.createUser({
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

  test("7.5 - Retornar erro de formato para parâmetro 'password' com menos de quatro caracteres", async () => {
    const response = await usersClient.createUser({
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

  test("7.6 - Retornar erro de formato para parâmetro 'password' com caracteres especiais", async () => {
    const response = await usersClient.createUser({
      email: emailValid,
      name: nameValid,
      password: "1234$&abcd",
      role: roleValid,
      avatar: avatarValid,
    });

    expect(response.status).toEqual(400);

    const data = await response.json();
    responseErrorSchema.validate(data);

    expect(data.message.length >= 1).toBe(true);
    expect(data.statusCode).toEqual(response.status);
  });

  test("7.7 - Retornar erro de formato para parâmetro 'role' diferente de 'admin' ou 'customer'", async () => {
    const response = await usersClient.createUser({
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

  test("7.8 - Retornar erro de formato para parâmetro 'avatar' vazio", async () => {
    const response = await usersClient.createUser({
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

  test("7.9 - Retornar erro de formato para parâmetro 'avatar' com padrão diferente de URL address", async () => {
    const response = await usersClient.createUser({
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

  afterAll(async () => {
    const response = await usersClient.deleteUser({
      id: idCreated,
    });

    expect(response.status).toEqual(200 | 204);
  });
});
