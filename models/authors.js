import mongoose from "mongoose";


const authorSchema=mongoose.Schema({
    name:{
        type:String
    },
    biography:{
        type:String
    }
});


const Author=(mongoose.models.Author)||(mongoose.model("Author",authorSchema));
export default Author;