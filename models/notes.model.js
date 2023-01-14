const mongoose=require("mongoose");

const noteSchema=mongoose.Schema({
    title:{type:String,required:true},
    note:{required:true,type:String},
    category:{required:true,type:String},
    author:{required:true,type:String},
    userID:String

});
const Notesmodel=mongoose.model("notes",noteSchema)


module.exports={Notesmodel,}