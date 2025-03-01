import connectDb from "@/lib/dbConnect"
import { UserModel } from "@/models/user"
import { getServerSession } from "next-auth"
import authOptions from "../auth/[...nextauth]/options"

type updateType= {update:boolean} 

export async function POST(req:Request){

    try {
        
    const {update} = await req.json()
    await connectDb()

    // const user = await UserModel.findOne({
    //     username
    // })

    const session =  await getServerSession(authOptions)

    if(!session){
        return Response.json({
            success:false,
            message:"not authenticated"
        })
    }



    if(session){

       const user = await UserModel.findOne({
        username:session.user.username
       })

       if(!user){
        return Response.json({
            success:false,
            message:"internal server error"
        })
       }

       user.isAcceptingMessage = update
       await user.save()

       return Response.json({
        succcess:true,
        message:"user message acceptance status updated"
       })
    }

    } catch (error) {
        return Response.json({
            success:false,
            message:"internal server error"
        })
    }

    

}