import {z} from 'zod'

export const verifycodeSchema = z.string().length(6,{message:"verify code must be 6 characters"})