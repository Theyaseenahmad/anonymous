import {z} from 'zod'

export const usernameValidation = z.string().min(3,{message:"username should be atleast 3 characters"}).regex(/^[a-zA-Z0-9]+$/
).max(20);

export const signUpSchema = z.object({
    username: usernameValidation,
    email:z.string().email({message:"please enter a valid email address"}),
    password:z.string().min(6,{message:"password must consist of 6 characters"})
})