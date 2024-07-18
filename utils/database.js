import mongoose, { mongo } from "mongoose";

let isConnected = false ;

export const connectToDb = async()=>
{
    mongoose.set('strictQuery' , true )

    if(isConnected)
    {
        console.log('MongoDb is already connected');
        return ;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI , {
            dbName : "promptopia",
            useNewUrlParser : true ,
            useUnifiedTopology : true ,
        })
        
        isConnected = true ;
        console.log('MongoDb Connected ');
    } catch (error) {
        console.log('conn' ,error);
    }
} 