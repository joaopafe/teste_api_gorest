import * as yup from "yup"

const imageSchema = yup.string().required()
const categorySchema = {
    id: yup.number().positive().required(),
    name: yup.string().required(),
    image: yup.string().url().required(),
    creationAt: yup.date().required(),
    updatedAt: yup.date().required(),
}

export const createProductSchema = yup.object({
    title: yup.string().required(),
    price: yup.number().positive().required(),
    description: yup.string().required(),
    images: yup.array().of(imageSchema).required(),
    category: yup.object(categorySchema),
    id: yup.number().positive().required(),
    creationAt: yup.date().required(),
    updatedAt: yup.date().required(),
});