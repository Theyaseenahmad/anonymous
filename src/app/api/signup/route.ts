import sendverificationEmail from "../../../helpers/sendVerificationEmail";
import connectDb from "@/lib/dbConnect";
import { UserModel } from "@/models/user";
import bcryptjs from 'bcryptjs'
import { NextResponse } from "next/server";

export async function POST(req:Request){
    await connectDb()
    try {
        const {username,email,password} = await req.json()
        
        const hashed = await bcryptjs.hash(password,10)
        const verifyCode = (Math.floor(100000 + 900000*Math.random())).toString()
        const verifyCodeExpiry= new Date(Date.now()+ 3600000);
    
        const verifieduserbyusername = await UserModel.findOne({username,isVerified:true})
    
        if(verifieduserbyusername){
            return NextResponse.json({success:false,message:'user already exist with this username'},{status:400})
        }
    
        const verifieduserbyemail = await UserModel.findOne({email,isVerified:true})
        
        if(verifieduserbyemail){
            return NextResponse.json({success:false,message:'user already exist with this email'},{status:400})
        }
    
        const existinguserbyEmail = await UserModel.findOne({email,
            isVerified:false
        })

        // const existinguserbyUsername = await UserModel.findOne({username,
        //     isVerified:false
        // })  wont be cuz username will be assigned to other as its not verified
    
        if(existinguserbyEmail ){
            existinguserbyEmail.password = hashed;
            existinguserbyEmail.verifyCode= verifyCode;
            existinguserbyEmail.verifyCodeExpiry=verifyCodeExpiry;
            await existinguserbyEmail.save();

        }
        else{

            const newUser = new UserModel({
                username,
                email,
                password:hashed,
                verifyCode,
                verifyCodeExpiry,
                isAcceptingMessage:true,
                isVerified:false,
                messages:[]
            })
    
            await newUser.save()
        }
        const emailResponse = await sendverificationEmail(username,email,verifyCode)
       
        return NextResponse.json({success:true,message:'user registered succssfully! please verify your email'},{status:201})
    
    } catch (error) {
        
        return NextResponse.json({success:false,message:'internal server error'},{status:500})
    }
   
}