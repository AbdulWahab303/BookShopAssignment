import mongoose from 'mongoose';
import History from './history.js';



const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'History'
    }]
});

// delete mongoose.models.User;
const User=(mongoose.models.User)||(mongoose.model("User",userSchema));
export default User;

