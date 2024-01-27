import * as yup from "yup";

export const categorieSchema = yup.object({
  id: yup.number().positive().required(),
  name: yup.string().required(),
  image: yup.string().url().required(),
  creationAt: yup.date().required(),
  updatedAt: yup.date().required(),
});

export const categoriesSchema = yup.array().of(categorieSchema);
