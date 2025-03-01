import {z}  from 'zod'
import { UserModel } from '@/models/user'
import connectDb from '@/lib/dbConnect'
import { usernameValidation } from '@/schemas/signupSchema'



const usernameinQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(req:Request){
try {
    await connectDb()

    const reqParams = new URL(req.url)
    const {searchParams} = reqParams

    const username = searchParams.get('username')

    const result = usernameinQuerySchema.safeParse({username:username})

   if(!result.success){
    return Response.json({
        success:false,
        message:"enter a valid username"
    })
   }

   const existingUser = await UserModel.findOne({
    username:result.data.username,
    isVerified:true
   })


   if(existingUser){
    return Response.json({
        success:false,
        message:"username not available"
    })
   }

   if(!existingUser){
    return Response.json({
        success:true,
        message:'username available'
    })
   }

    


} catch (error) {

    return Response.json({
        success:false,
        message:"internal server error"
    })
}

}