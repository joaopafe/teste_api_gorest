describe("Cenário 9 - Alteração de usuários (PUT /api/v1/users/{id})", () => {
    test("9.1 - Alterar usuário cadastrado através de requisição válida", () => {});
    
    test("9.2 - Retornar erro de formato para falta de parâmetros obrigatórios", () => {});
    
    test("9.3 - Retornar erro para parâmetro 'id' do tipo string não numérica", () => {});
    
    test("9.4 - Retornar erro para parâmetro 'id' não cadastrado", () => {});
    
    test("9.5 - Retornar erro de formato para parâmetro 'email' vazio", () => {});

    test("9.6 - Retornar erro de formato para parâmetro 'email' com padrão diferente de e-mail", () => {});
    
    test("9.7 - Retornar erro de formato para parâmetro 'name' vazio", () => {});

    test("9.8 - Retornar erro de formato para parâmetro 'password' com menos de quatro caracteres", () => {});

    test("9.9 - Retornar erro de formato para parâmetro 'password' com caracteres especiais", () => {});
    
    test("9.10 - Retornar erro de formato para parâmetro 'role' diferente de 'admin' ou 'customer'", () => {});
    
    test("9.11 - Retornar erro de formato para parâmetro 'avatar' vazio", () => {});

    test("9.12 - Retornar erro de formato para parâmetro 'avatar' com padrão diferente de URL address", () => {});
});