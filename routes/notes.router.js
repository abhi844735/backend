const { response } = require("express");
const express=require("express");
const { Notesmodel } = require("../models/notes.model");
// const { notesRouter } = require("../routes/notes.router");
const app = express();
const notesRouter=express.Router();
app.use(express.json());

notesRouter.get("/",async(req,res)=>{
    let userId=req.body.userID;
   try {
    let data = await Notesmodel.find({userID:userId});
    res.send({data:data});
    
   } catch (error) {
    res.send({error:error.message})
   }
})
notesRouter.post("/add",async(req,res)=>{
     
    try {
        let data = await new Notesmodel(req.body);
        await data.save();
        res.send("note has been added");
    } catch (error) {
        console.log({error:error.message})
    }
})
notesRouter.patch("/update/:id",async(req,res)=>{
    try {
        let id = req.params.id;
        let data = await Notesmodel.findOne({_id:id});
        let user_Id=req.body.userID;
        let notes_userId=data.userID;
        if(user_Id==notes_userId){
            await Notesmodel.findByIdAndUpdate({_id:id},req.body);
            
            res.send("data has been updated")
        }else{
            res.send({message:"not authorised"})
        }
       
        await data.save();
        res.send("data has been updated");
        
    } catch (error) {
        console.log({error:error.message})
    }
})
notesRouter.delete("/delete/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let data = await Notesmodel.find({_id:id});
        if(data.length>0){
            let notes_userId=data[0].userID;
            let user_Id=req.body.userID;
            if(notes_userId==user_Id){
                await Notesmodel.findByIdAndDelete({_id:id});
                res.send("notes has been deleted");
            }else{
                res.send({message:"You are not authorised"})
            }
        }else{
            res.send({message:"no id found"})
        }
        
    } catch (error) {
        console.log({error:error.message})
    }
})

module.exports={notesRouter}