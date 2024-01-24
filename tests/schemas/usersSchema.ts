import * as yup from "yup";

const userSchema = yup.object({
  id: yup.number().positive().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().required(),
  role: yup.string().oneOf(["admin", "customer"]).required(),
  avatar: yup.string().url().required(),
  creationAt: yup.date().required(),
  updatedAt: yup.date().required(),
});

export const usersSchema = yup.array().of(userSchema);
