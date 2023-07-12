import * as yup from 'yup'

const categorySchema = yup.object({
  id: yup.number().positive().required(),
  name: yup.string().required(),
  image: yup.string().url().required(),
  creationAt: yup.date().required(),
  updatedAt: yup.date().required(),
});

export const updateProductSchema = yup.object({
  id: yup.number().positive().required(),
  title: yup.string().required(),
  price: yup.number().positive().required(),
  description: yup.string().required(),
  images: yup.array().of(yup.string().url().required()).required(),
  creationAt: yup.date().required(),
  updatedAt: yup.date().required(),
  category: categorySchema,
});