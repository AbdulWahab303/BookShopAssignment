import dbConnect from "@/helpers/dbConnect";
import User from "@/models/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();


export default async function handler(req,res) {
    await dbConnect();
    if(req.method==="GET"){


        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({message:"No Token Provied"});
        }

        try {
            const decoded=jwt.verify(token,process.env.SECRET);
            const user=await User.findById(decoded.id);
            if(user){
                return res.status(200).json({success:true,user:user});
            }
            else{
                return res.status(401).json({message:" Invalid id"});
            }
        } catch (error) {
            return res.status(401).json({message:" Invalid Token"});
        }

    }
    else if(req.method==="POST"){
        const email=req.body.email;
        const password=req.body.password;

        const user=await User.findOne({email:email});
        if(!user){
            return res.status(404).json({message:"No such User found",success:false});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(isPasswordCorrect){
            const token=jwt.sign(
                {id:user._id},
                process.env.SECRET,
                {expiresIn:'1h'}
            );
            return res.status(200).json({message:"User found",success:true,token:token});
        }
        else{
            console.log("Error");
            return res.status(404).json({message:"No such User found",success:false});
        }

    }
}