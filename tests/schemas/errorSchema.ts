import * as yup from "yup";

export const responseErrorSchema = yup.object({
	statusCode: yup.number().min(400).max(499).required(),
	message: yup.array().required(),
    error: yup.string().required(),
}).required();