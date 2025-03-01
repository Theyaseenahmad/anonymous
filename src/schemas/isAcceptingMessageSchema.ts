import {z} from 'zod'

export const isAcceptingSchema = z.object({
    acceptMessages:z.boolean(),
})