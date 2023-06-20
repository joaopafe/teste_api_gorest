import { ProductsClient } from "../../clients/products/productsClient";
import { config } from "../../config";
import { createProductSchema } from "../../schemas";

describe("Cenário 2 - Criação de produtos (POST /api/v1/products)", () => {
    const productsClient = new ProductsClient;

    // let idCreated = 0;

    test("2.1 - Cadastrar produto através de requisição válida", async () => {
        const title = config.postProductsValid.title;
        const price = config.postProductsValid.price;
        const description = config.postProductsValid.description;
        const categoryId = config.postProductsValid.categoryId;
        const images = config.postProductsValid.images;

        const response = await productsClient.createProduct({
            title,
            price,
            description,
            categoryId,
            images,
        });

        expect(response.status).toEqual(201);

        const data = await response.json();

        await createProductSchema.validate(data);

        expect(data.title).toBe(title);
        expect(data.price).toBe(price);
        expect(data.description).toBe(description);
        expect(data.category.id).toBe(categoryId);
        
        for(let imageId = 0; imageId < data.images.length; imageId++){
            expect(data.images[imageId]).toBe(images[imageId]);
        }

        const idCreated = data.id;

        await productsClient.deleteProduct({
            id: idCreated,
        });
    });

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

    // afterAll(async () => {
    //     productsClient.deleteProduct({
    //         id: idCreated,
    //     })
    // });
});