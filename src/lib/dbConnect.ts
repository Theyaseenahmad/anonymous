import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number,
}

const connection: connectionObject = {}

const connectDb = async ():Promise<void> =>{ // function return a promise of any type not concerned
    if(connection.isConnected){
    
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI|| '')

       

        connection.isConnected = db.connections[0].readyState 

       

        if(connection.isConnected){
            
        }
        else{
            
            process.exit(1)
        }

        
    } catch (error) {
       
        process.exit(1);
    }
}

export default connectDb

// if db does not connects then it gives error otherwise it does not specifically alert the user