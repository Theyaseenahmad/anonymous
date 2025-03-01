// for toggle button

import { UserModel } from "@/models/user";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/options";
import connectDb from "@/lib/dbConnect";

export async function GET(req:Request){
    const session = await getServerSession(authOptions)


    const user = await UserModel.findOne({
        username:session?.user.username
    })

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"not authenticated"
        })
    }

    if(user?.isAcceptingMessage){
        return Response.json({
            success:true,
            message:"user is accepting message"
        })
    }
    else{
        return Response.json({
            success:false,
            message:'user is not accepting message'
        })
    }

    


}
