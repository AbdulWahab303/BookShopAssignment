import Books from "@/models/books";
import dbConnect from "@/helpers/dbConnect";


export default async function handler(req,res) {
    await dbConnect();
    const id=req.query.id;
    try {
        const books=await Books.find({genreId:id}).populate("genreId");
        if(!books){
            return res.status(400).json({message:"Not Found",success:false});
        }
        return res.status(200).json({data:books,message:"Found",success:true});
    } catch (error) {
        return res.status(400).json({message:"Not Found",success:false});
    }
}