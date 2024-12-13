import dbConnect from "@/helpers/dbConnect";
import Books from "@/models/books";


export default async function handler(req,res){
    await dbConnect();
    
    try {
        const books=await Books.find();
        
        if(!books){
            return res.status(500).json({message:"Server Side Error"});
        }
        return res.status(200).json({data:books,message:"Success"});
    } catch (error) {
        console.error("Error in Fetching Books",error);
    }
}   