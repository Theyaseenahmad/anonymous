import connectDb from "@/lib/dbConnect";
import { UserModel } from "@/models/user";


export async function POST(req:Request){
    try {
        await connectDb()
        const {username, otp} = await req.json()
        const user = await UserModel.findOne({
            username,
            verifyCode:otp
        })

        if(user && !user.isVerified){
            const iscodeExpired = new Date(user.verifyCodeExpiry) > new Date() //check date greater than
            user.verifyCode = otp
            user.isVerified = true
            await user.save()


            return Response.json({
                success:true,
                message:"user verified successfully"
            })

        }
        if(user?.isVerified){
            return Response.json({
                successs:false,
                message:"user already verified"
            })

        }
        if(!user){
            return Response.json({
                success:false,
                message:'user does not exist'
            })
        }
    } catch (error) {
        return Response.json({
            succcess:false,
            message:'internal server error'
        })
    }
   



}