import mongoose ,{ Schema, Document} from "mongoose";

export interface Message extends mongoose.Document{  // user document has many document called message within message array
    content: string,
    createdAt:Date,
}

const MessageSchema:Schema<Message> = new mongoose.Schema({ // defining message schema
    content:{
    type:String,
    required:true,
    },
    createdAt:{type:Date,
        required:true,
        default:Date.now},
})

export interface User extends mongoose.Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    isAcceptingMessage: boolean,
    messages: Message[]

}

const userSchema : Schema<User> = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'please enter a valid email address'], //regex pattern for email
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    verifyCode:{
        type:String,
        required:true,
    },
    verifyCodeExpiry:{
        type:Date,

    },
    isVerified:{
        type:Boolean,
        required:false,
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true,

    },
    messages:{
        type:[MessageSchema],
    }
})


export const UserModel = mongoose.models.User as mongoose.Model<User>|| mongoose.model<User>('User',userSchema)

export const MessageModel = mongoose.models.Message as mongoose.Model<Message> || mongoose.model<Message>('Message',MessageSchema)

