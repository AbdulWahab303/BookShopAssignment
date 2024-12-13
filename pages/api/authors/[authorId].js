import dbConnect from "@/helpers/dbConnect";
import Author from "@/models/authors";

export default async function handler(req,res) {
    await dbConnect();
    const {authorId}=req.query;
    try {
        const author=await Author.findById(authorId);
        if(!author){
            return res.status(404).json({message:"Not found",error:error});   
        }
        return res.status(200).json({data:author,message:"Success"});

        
    } catch (error) {
        console.log("Server Error",error);
        return res.status(500).json({message:"Error in Something",error:error});   
    }
}