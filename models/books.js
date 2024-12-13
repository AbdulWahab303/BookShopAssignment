import mongoose from "mongoose";
import Author from './authors.js';
import Genre from './genres.js';



const bookSchema=mongoose.Schema({
    title:{
        type:String
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Author'
    },
    description:{
        type:String
    },
    price:{
        type:String
    },
    genreId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Genre'
    },
    rating:{
        type:String,
    },
    isFeatured:{
        type:Boolean
    },
    imagePath:{
        type:String,
    }
});


const Books=(mongoose.models.Book)||(mongoose.model('Book',bookSchema));
export default Books;