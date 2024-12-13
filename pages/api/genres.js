import Genre from "@/models/genres";
import dbConnect from "@/helpers/dbConnect";


export default async function handler(req,res) {
    await dbConnect();

    try{
        const genre=await Genre.find();
        if(!genre){
            return res.status(404).json({message:"Not found",success:false});
        }
        else{
            return res.status(200).json({data:genre,message:"Found",success:true});
        }

    }
    catch(error){
        return res.status(404).json({message:"Not found",success:false});
    }
}