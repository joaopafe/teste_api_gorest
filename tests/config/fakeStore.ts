export const basicConfiguration = {
  baseURL: "https://api.escuelajs.co",
};

export const getProductsValid = {
  limit: 1,
  offset: 1,
};

export const getProductsInvalid = {
  limit: "a",
  offset: "b",
};

export const postProductsValid = {
  title: "AllStar",
  price: 100,
  description: "A great everyday shoe that combines comfort and style",
  categoryId: 4,
  images: ["https://picsum.photos/640/640?r=5315"],
};

export const putProductsValid = {
  title: "Oakley Flak",
  price: 350,
  description: "A good sneaker for casual dates and parties",
  categoryId: 4,
  images: ["https://picsum.photos/640/640?r=5315"],
};

export const getUsersValid = {
  limit: 1,
};

export const postUsersValid = {
  email: "john.smith@mail.com",
  name: "John Smith",
  password: "john1234",
  role: "customer",
  avatar: "https://i.imgur.com/LDOO4Qs.jpg",
};
