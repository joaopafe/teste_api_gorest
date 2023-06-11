describe("Cenário 7 - Criação de usuários(POST /api/v1/users/{id})", () => {
    test("7.1 - Cadastrar usuário através de requisição válida", () => {});

    test("7.2 - Retornar erro de formato para falta de parâmetros obrigatórios", () => {});

    test("7.2 - Retornar erro de formato para parâmetro 'email' vazio", () => {});

    test("7.3 - Retornar erro de formato para parâmetro 'email' com padrão diferente de e-mail", () => {});
    
    test("7.4 - Retornar erro de formato para parâmetro 'name' vazio", () => {});

    test("7.5 - Retornar erro de formato para parâmetro 'password' com menos de quatro caracteres", () => {});

    test("7.6 - Retornar erro de formato para parâmetro 'password' com caracteres especiais", () => {});
    
    test("7.7 - Retornar erro de formato para parâmetro 'role' diferente de 'admin' ou 'customer'", () => {});
    
    test("7.8 - Retornar erro de formato para parâmetro 'avatar' vazio", () => {});

    test("7.9 - Retornar erro de formato para parâmetro 'avatar' com padrão diferente de URL address", () => {});
});