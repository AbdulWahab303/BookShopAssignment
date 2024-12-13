import mongoose from "mongoose";



const genreSchema=mongoose.Schema({
    name:{
        type:String
    }
});


const Genre=(mongoose.models.Genre)||(mongoose.model("Genre",genreSchema));
export default Genre;