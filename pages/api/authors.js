import dbConnect from "@/helpers/dbConnect";
import Author from "@/models/authors";


export default async function handler(req,res) {
    await dbConnect();
    try{
         const authors=await Author.find();
         if(!authors){
            return res.status(500).json({message:"Something Went Wrong",message:"Failed"});
         }
         return res.status(200).json({data:authors,message:"Success"});
    }
    catch(err){
        console.log("Error");
        return res.status(500).json({message:"Something Went Wrong",message:"Failed"});
    }
}