import { ProductsClient } from "../../clients/products/productsClient";
import { config } from "../../config";
import { updateProductSchema, responseErrorSchema } from "../../schemas";

describe("Cenário 4 - Alteração de produtos (PUT /api/v1/products/{id})", () => {
    const productsClient = new ProductsClient();

    let idCreated = 0;

    beforeAll(async () => {
        const response = await productsClient.createProduct({
            title: config.postProductsValid.title,
            price: config.postProductsValid.price,
            description: config.postProductsValid.description,
            categoryId: config.postProductsValid.categoryId,
            images: config.postProductsValid.images,
        });

        expect(response.status).toEqual(201);

        const data = await response.json();

        idCreated = data.id;
    });

    test("4.1 - Alterar produto cadastrado através de requisição válida", async () => {
        const id = idCreated;
        const title = config.putProductsValid.title;
        const price = config.putProductsValid.price;
        const description = config.putProductsValid.description;
        const categoryId = config.putProductsValid.categoryId;
        const images = config.putProductsValid.images;
        
        const response = await productsClient.updateProductValid({
            id,
            title,
            price,
            description,
            categoryId,
            images,
        });

        expect(response.status).toEqual(200);

        const data = await response.json();

        await updateProductSchema.validate(data);

        expect(data.id).toEqual(id);
        expect(data.title).toBe(title);
        expect(data.price).toBe(price);
        expect(data.description).toBe(description);
        expect(data.category.id).toBe(categoryId);

        for (let image = 0; image < data.images.length; image++){
            expect(data.images[image]).toEqual(images[image]);
        }
    });

    test("4.2 - Retornar erro de formato para falta de parâmetros obrigatórios", async () => {
        const id = idCreated;
        
        const response = await productsClient.updateProductWithoutParams({
            id,
        });

        expect(response.status).toEqual(400);

        const data = await response.json();

        await responseErrorSchema.validate(data);

        expect(data.statusCode).toEqual(response.status);
        expect(data.message.length >= 1).toBe(true);
    });

    test("4.3 - Retornar erro para parâmetro 'id' do tipo string não numérica", async () => {
        const id = "a"
        const title = config.putProductsValid.title;
        const price = config.putProductsValid.price;
        const description = config.putProductsValid.description;
        const categoryId = config.putProductsValid.categoryId;
        const images = config.putProductsValid.images;

        const response = await productsClient.updateProductInvalid({
            id,
            title,
            price,
            description,
            categoryId,
            images,
        });

        expect(response.status).toEqual(404);

        const data = await response.json();

        responseErrorSchema.validate(data);

        expect(data.statusCode).toBe(response.status);
        expect(data.message.length >= 1).toBe(true);
    });
    
    test("4.4 - Retornar erro para parâmetro 'id' não cadastrado", async () => {
        const requireProducts = await productsClient.listProducts({
            limit: 100000,
            offset: 0,
        });

        const listProducts = await requireProducts.json();

        const nonExistentId = (listProducts[listProducts.length - 1].id) + 1;

        const id = nonExistentId;
        const title = config.putProductsValid.title;
        const price = config.putProductsValid.price;
        const description = config.putProductsValid.description;
        const categoryId = config.putProductsValid.categoryId;
        const images = config.putProductsValid.images;

        const response = await productsClient.updateProductInvalid({
            id: nonExistentId,
            title,
            price,
            description,
            categoryId,
            images,
        });

        expect(response.status).toEqual(404);

        const data = await response.json();

        responseErrorSchema.validate(data);

        expect(data.statusCode).toBe(response.status);
        expect(data.message.length >= 1).toBe(true);
    });
    
    test("4.5 - Retornar erro de formato para parâmetro 'title' vazio", async () => {
        const id = idCreated;
        const title = "";
        const price = config.putProductsValid.price;
        const description = config.putProductsValid.description;
        const categoryId = config.putProductsValid.categoryId;
        const images = config.putProductsValid.images;

        const response = await productsClient.updateProductInvalid({
            id,
            title,
            price,
            description,
            categoryId,
            images,
        });

        expect(response.status).toEqual(400);

        const data = await response.json();

        responseErrorSchema.validate(data);

        expect(data.statusCode).toBe(response.status);
        expect(data.message.length >= 1).toBe(true);
    });
    
    test("4.6 - Retornar erro de formato para parâmetro 'price' com valor zero", async () => {
        const id = idCreated;
        const title = config.putProductsValid.title;
        const price = 0;
        const description = config.putProductsValid.description;
        const categoryId = config.putProductsValid.categoryId;
        const images = config.putProductsValid.images;

        const response = await productsClient.updateProductInvalid({
            id,
            title,
            price,
            description,
            categoryId,
            images,
        });

        expect(response.status).toEqual(400);

        const data = await response.json();

        responseErrorSchema.validate(data);

        expect(data.statusCode).toBe(response.status);
        expect(data.message.length >= 1).toBe(true);
    });
    
    test("4.7 - Retornar erro de formato para parâmetro 'price' com valor negativo", async () => {
        const id = idCreated;
        const title = config.putProductsValid.title;
        const price = -10;
        const description = config.putProductsValid.description;
        const categoryId = config.putProductsValid.categoryId;
        const images = config.putProductsValid.images;

        const response = await productsClient.updateProductInvalid({
            id,
            title,
            price,
            description,
            categoryId,
            images,
        });

        expect(response.status).toEqual(400);

        const data = await response.json();

        responseErrorSchema.validate(data);

        expect(data.statusCode).toBe(response.status);
        expect(data.message.length >= 1).toBe(true);
    });
    
    test("4.8 - Retornar erro de formato para parâmetro 'price' do tipo string", async () => {
        const id = idCreated;
        const title = config.putProductsValid.title;
        const price = "Três";
        const description = config.putProductsValid.description;
        const categoryId = config.putProductsValid.categoryId;
        const images = config.putProductsValid.images;

        const response = await productsClient.updateProductInvalid({
            id,
            title,
            price,
            description,
            categoryId,
            images,
        });

        expect(response.status).toEqual(400);

        const data = await response.json();

        responseErrorSchema.validate(data);

        expect(data.statusCode).toBe(response.status);
        expect(data.message.length >= 1).toBe(true);
    });

    test("4.9 - Retornar erro de formato para parâmetro 'description' vazio", async () => {
        const id = idCreated;
        const title = config.putProductsValid.title;
        const price = config.putProductsValid.price;
        const description = "";
        const categoryId = config.putProductsValid.categoryId;
        const images = config.putProductsValid.images;

        const response = await productsClient.updateProductInvalid({
            id,
            title,
            price,
            description,
            categoryId,
            images,
        });

        expect(response.status).toEqual(400);

        const data = await response.json();

        responseErrorSchema.validate(data);

        expect(data.statusCode).toBe(response.status);
        expect(data.message.length >= 1).toBe(true);
    });

    test("4.10 - Retornar erro de formato para parâmetro 'categoryId' com valor negativo", async () => {
        const id = idCreated;
        const title = config.putProductsValid.title;
        const price = config.putProductsValid.price;
        const description = config.putProductsValid.description;
        const categoryId = -10;
        const images = config.putProductsValid.images;

        const response = await productsClient.updateProductInvalid({
            id,
            title,
            price,
            description,
            categoryId,
            images,
        });

        expect(response.status).toEqual(400);

        const data = await response.json();

        responseErrorSchema.validate(data);

        expect(data.statusCode).toBe(response.status);
        expect(data.message.length >= 1).toBe(true);
    });
    
    test("4.11 - Retornar erro de formato para parâmetro 'categoryId' do tipo string", async () => {
        const id = idCreated;
        const title = config.putProductsValid.title;
        const price = config.putProductsValid.price;
        const description = config.putProductsValid.description;
        const categoryId = "Três";
        const images = config.putProductsValid.images;

        const response = await productsClient.updateProductInvalid({
            id,
            title,
            price,
            description,
            categoryId,
            images,
        });

        expect(response.status).toEqual(400);

        const data = await response.json();

        responseErrorSchema.validate(data);

        expect(data.statusCode).toBe(response.status);
        expect(data.message.length >= 1).toBe(true);
    });
    
    test("4.12 - Retornar erro de formato para parâmetro 'images' vazio", async () => {
        const id = idCreated;
        const title = config.putProductsValid.title;
        const price = config.putProductsValid.price;
        const description = config.putProductsValid.description;
        const categoryId = config.putProductsValid.categoryId;
        const images = [""];

        const response = await productsClient.updateProductInvalid({
            id,
            title,
            price,
            description,
            categoryId,
            images,
        });

        expect(response.status).toEqual(400);

        const data = await response.json();

        responseErrorSchema.validate(data);

        expect(data.statusCode).toBe(response.status);
        expect(data.message.length >= 1).toBe(true);
    });
    
    test("4.13 - Retornar erro de formato para parâmetro 'images' com padrão diferente de URL address", async () => {
        const id = idCreated;
        const title = config.putProductsValid.title;
        const price = config.putProductsValid.price;
        const description = config.putProductsValid.description;
        const categoryId = config.putProductsValid.categoryId;
        const images = [1, 2, 3, 4, 5];

        const response = await productsClient.updateProductInvalid({
            id,
            title,
            price,
            description,
            categoryId,
            images,
        });

        expect(response.status).toEqual(400);

        const data = await response.json();

        responseErrorSchema.validate(data);

        expect(data.statusCode).toBe(response.status);
        expect(data.message.length >= 1).toBe(true);
    });
    
    test("4.14 - Retornar erro de formato para parâmetro 'images' que não seja um array", async () => {
        const id = idCreated;
        const title = "";
        const price = config.putProductsValid.price;
        const description = config.putProductsValid.description;
        const categoryId = config.putProductsValid.categoryId;
        const images = "";

        const response = await productsClient.updateProductInvalid({
            id,
            title,
            price,
            description,
            categoryId,
            images,
        });

        expect(response.status).toEqual(400);

        const data = await response.json();

        responseErrorSchema.validate(data);

        expect(data.statusCode).toBe(response.status);
        expect(data.message.length >= 1).toBe(true);
    });

    afterAll(async () => {
        productsClient.deleteProduct({
            id: idCreated,
        });
    });
});