import connectDb from "@/lib/dbConnect";
import { UserModel } from "@/models/user";
import  {NextAuthOptions}  from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcryptjs from 'bcryptjs'


const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:'credentials',
            name:'credentials',

            credentials:{
                identifier:{label:"identifier", type:'text'}, // important for frontend form design
                password:{label:"password", type:'password'} // important for frontend form design
            },
            async authorize(credentials:any):Promise<any>{
                await connectDb()
                try {
                    const {identifier,password} = credentials

                    const query = identifier.includes('@')? {email:identifier} : {username:identifier}
                    const user = await UserModel.findOne(query)
                    
                    if(user){
                        if(!user.isVerified){
                        throw new Error("user not verified please verify your email");
                        }
                        const isPasswordCorrect = await bcryptjs.compare(password,user.password)
                        if(!isPasswordCorrect){
                            throw new Error("password is incorrect")
                        }
                        else{
                            return user ;
                        }
                    }
                    else{
                         throw new Error("user does not exist")
                        
                    }
                } catch (error) {
                    throw new Error("internal server error")
                }

            },

        })
    ],
    pages:{
        signIn: '/signin',
        signOut: '/signout',
    },
    secret: process.env.NEXTAUTH_SECRET,

    session:{strategy:"jwt",maxAge: 30 * 24 * 60 * 60, },

    callbacks:{
        async jwt({ token, user} ) {
            if( user){
                token._id= user._id
                token.username = user.username
                token.isVerified = user.isVerified
                token.isAcceptingMessage = user.isAcceptingMessage

            }
           

            return token
          },
        async session({ session,  token }) {
            session.user._id = token._id
            session.user.username = token.username
            session.user.isVerified = token.isVerified
            session.user.isAcceptingMessage= token.isAcceptingMessage
            
            return session
          }
          
    }

}

export default authOptions