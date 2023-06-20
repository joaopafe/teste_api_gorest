export const basicConfiguration = {
    baseURL: "https://api.escuelajs.co",
}

export const getProductsValid = {
    limit: 1,
    offset: 1,
}

export const getProductsInvalid = {
    limit: "a",
    offset: "b",
}

export const postProductsValid = {
    title: "AllStar",
    price: 100,
    description: "A great everyday shoe that combines comfort and style",
    categoryId: 4,
    images: ["https://picsum.photos/640/640?r=5315"],
}