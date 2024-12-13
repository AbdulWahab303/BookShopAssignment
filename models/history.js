import mongoose from "mongoose";


const historySchema=mongoose.Schema({
    history:{
        type:String
    }
});

// delete mongoose.models.Histor;
const History=(mongoose.models.History)||(mongoose.model("History",historySchema));
export default History;