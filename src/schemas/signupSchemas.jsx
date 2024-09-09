import { z } from "zod";


export const signUpSchema = z.object({
	email: z.string().email({ message: 'invalid email id' }),
	password: z.string().min(6, { message: "password must be atleast 6 characters" }),
	fullName: z.string().optional(),
})
