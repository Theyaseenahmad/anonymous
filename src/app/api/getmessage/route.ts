import mongoose from "mongoose";
import connectDb from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import authOptions from "../auth/[...nextauth]/options";
import { UserModel } from "@/models/user";


export async function GET(req:Request){

    try {
        await connectDb()
        const session = await getServerSession(authOptions)

    if(!session){
        return Response.json({
            suvccess:false,
            message:"user not authenticated"
        })
    }

    const userId = new mongoose.Types.ObjectId(session.user._id) 

    

    const user =  await UserModel.aggregate(
        [{$match: { _id: new mongoose.Types.ObjectId(userId) } },
            {$unwind:"$messages"},{
                $sort:{"message.createdAt":-1},
                
            },{
                $group:{_id:"$_id",messages:{$push:"$messages"}}
            }
        ]
    )

  
    

    if(!user || user.length===0){
        return Response.json({
            success:false,
            message:"user not found"
        })
    }

    return Response.json({
        success:true,
        message:user[0].messages
    })

    } catch (error) {
        return Response.json({
            success:false,
            message:"internal server error"
        })
    }


}