import { z } from "zod";
import { usernameValidation } from "./signupSchema";

export const signinSchema = z.object({
  identifier: z.union([
    usernameValidation,
    z.string().email({message:'enter a valid email address'})
  ]),
  password: z.string().min(6),
});
