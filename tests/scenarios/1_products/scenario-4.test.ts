describe("Cenário 4 - Alteração de produtos (PUT /api/v1/products/{id})", () => {
    test("4.1 - Alterar produto cadastrado através de requisição válida", () => {});

    test("4.2 - Retornar erro de formato para falta de parâmetros obrigatórios", () => {});

    test("4.3 - Retornar erro de formato para parâmetro 'id' do tipo string não numérica", () => {});
    
    test("4.4 - Retornar erro para parâmetro 'id' não cadastrado", () => {});
    
    test("4.5 - Retornar erro de formato para parâmetro 'title' vazio", () => {});
    
    test("4.6 - Retornar erro de formato para parâmetro 'price' com valor zero", () => {});
    
    test("4.7 - Retornar erro de formato para parâmetro 'price' com valor negativo", () => {});
    
    test("4.8 - Retornar erro de formato para parâmetro 'price' do tipo string", () => {});

    test("4.9 - Retornar erro de formato para parâmetro 'description' vazio", () => {});

    test("4.10 - Retornar erro de formato para parâmetro 'categoryId' com valor negativo", () => {});
    
    test("4.11 - Retornar erro de formato para parâmetro 'categoryId' do tipo string", () => {});
    
    test("4.12 - Retornar erro de formato para parâmetro 'images' vazio", () => {});
    
    test("4.13 - Retornar erro de formato para parâmetro 'images' com padrão diferente de URL address", () => {});
    
    test("4.14 - Retornar erro de formato para parâmetro 'images' que não seja um array", () => {});
});