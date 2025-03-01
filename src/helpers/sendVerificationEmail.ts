import { Resend } from "resend";
import SendVerifyEmail from "../templates/SendVerifyEmail";
import { apiResponse } from "../types/apiResponse";

const resend = new Resend(process.env.RESEND_API_KEY);


const sendverificationEmail = async(  // this is a function not a component
    username:string,
    email:string,
    verifyCode:string,
):Promise<apiResponse>  => {
    try {
        
    const emailResponse = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'verification code',
        react: SendVerifyEmail(username,verifyCode),
      });

      return ({success:true,message:'email sent successfully'})

      
    } catch (error) {
        
        return ({success:false,message:'failed to send email'})

    }


}

export default sendverificationEmail