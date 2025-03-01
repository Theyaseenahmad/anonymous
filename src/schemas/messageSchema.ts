import {z} from 'zod'

export const messageSchema = z.object({
    message:z.string().min(3,{message:"message must be atleast 3 characters"}).max(300,"message must be contained within 300 letters")
})
