import { connectToDb } from "@utils/database";
import User from "@models/user";

export const GET = async(request , {params})=>
{
    console.log('sui');
    try {
        connectToDb();
        const creator = await User.findById(params.id);
        
        if(creator)  return new Response(JSON.stringify(creator) , {status: 200});
        return new Response('User not found ' , {status : 404});
       
    } catch (error) {
        return new Response("Failed to get user " , {status : 500})
    }
}