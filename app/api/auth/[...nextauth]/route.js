import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connectToDb } from "@utils/database";
import mongoose, { mongo } from "mongoose";
import User from "@models/user";

const handler = NextAuth({
    providers : [
            GoogleProvider({
                clientId : process.env.GOOGLE_ID,
                clientSecret : process.env.GOOGLE_CLIENT_SECRET
            })
    ],

  callbacks : {
    async session ({session})
    {
        const userSession = await User.findOne({
            email : session.user.email
        })

        session.user.id = userSession._id.toString();

        return session ;
    },

    async signIn ({profile})
    {
        try {
            connectToDb();

            // check if user already exists
            const userExist = await User.findOne({
                email : profile.email
            });

            // if not , create a new user 
            if(!userExist)
            {
                console.log(profile);
                await User.create({
                    email : profile.email ,
                    username : profile?.name?.replace(" " , "")
                    .toLowerCase(),
                    image : profile.picture 
                })
            }
            return true ;
            } catch (error) {
                console.log(error);
                return false ;
        }
    }
  }
})

export {handler as GET, handler as POST };