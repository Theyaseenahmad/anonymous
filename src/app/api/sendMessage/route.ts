import connectDb from "@/lib/dbConnect";
import { Message, UserModel } from "@/models/user";
import { messageSchema } from "@/schemas/messageSchema";
import {z} from "zod"

export async function POST(req:Request){



    const reqSchema = z.object({
        message: messageSchema.shape.message,
        username: z.string()
    })


    try {
       
        await connectDb()
        const body =  await req.json()

       const validMessage =  reqSchema.safeParse(body)


       
       if(!validMessage.success){
        return Response.json({
            success:false,
            message:"invalid message parsing"
        })
    }

       const {message, username} = validMessage.data


        const user = await UserModel.findOne({
            username
        })

        if(!user){
            return Response.json({
                success:false,
                message:"cannot find user"
            })
        }

        const newMessage = {content:message, createdAt: new Date()}

         user.messages.push(newMessage as Message)
         await user.save()

         return Response.json({
            success:true,
            message:"message sent successfully"
        })
    } catch (error) {
        return Response.json({
            success:false,
            message:"internal server error"
        })
    }

}