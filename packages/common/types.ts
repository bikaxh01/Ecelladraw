import {z} from 'zod'


export const signUpSchema = z.object({
    email:z.string().email({message:"Invalid email format"}),
    password:z.string().min(8,{message:"Password must contain at least 8 character"}).max(20,{message:"Password should be less than 20 character"})
})
export const signInSchema = z.object({
    email:z.string().email({message:"Invalid email format"}),
    password:z.string().min(8,{message:"Password must contain at least 8 character"}).max(20,{message:"Password should be less than 20 character"})
})