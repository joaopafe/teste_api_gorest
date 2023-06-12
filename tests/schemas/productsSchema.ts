import * as yup from 'yup';

const imagesSchema = yup.string().url().required();

const categorySchema = yup.object({
    id: yup.number().positive().required(),
    name: yup.string().required(),
    image: yup.string().url().required(),
    creationAt: yup.date().required(),
    updatedAt: yup.date().required(),
});

const productSchema = yup.object({
    id: yup.number().positive().required(),
    title: yup.string().required(),
    price: yup.number().positive().required(),
    description: yup.string().required(),
    images: yup.array().of(imagesSchema).required(),
    creationAt: yup.date().required(),
    updatedAt: yup.date().required(),
    category: categorySchema,
});

export const productsSchema = yup.array().of(productSchema).required();