describe("Cenário 2 - Criação de produtos (POST /api/v1/products)", () => {
    test("2.1 - Cadastrar produto através de requisição válida", () => {});

    test("2.2 - Retornar erro de formato para falta de parâmetros obrigatórios", () => {});

    test("2.3 - Retornar erro de formato para parâmetro 'title' vazio", () => {});

    test("2.4 - Retornar erro de formato para parâmetro 'price' com valor zero", () => {});

    test("2.5 - Retornar erro de formato para parâmetro 'price' com valor negativo" , () => {});

    test("2.6 - Retornar erro de formato para parâmetro 'price' do tipo string", () => {});

    test("2.7 - Retornar erro de formato para parâmetro 'description' vazio", () => {});

    test("2.8 - Retornar erro de formato para parâmetro 'categoryId' com valor negativo", () => {});

    test("2.9 - Retornar erro de formato para parâmetro 'categoryId' do tipo string", () => {});

    test("2.10 - Retornar erro de formato para parâmetro 'images' vazio", () => {});

    test("2.11 - Retornar erro de formato para parâmetro 'images' com padrão diferente de URL address", () => {});

    test("2.12 - Retornar erro de formato para parâmetro 'images' que não seja um array", () => {});
});