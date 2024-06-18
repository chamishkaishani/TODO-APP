import List from "../models/list.model.js";

export const createList = async (req ,res ,next) => {

    
    try{
        const newlist = await List.create(req.body);
        return res.status(201).json(newlist);

    }catch(error){
        next(error);
    }
};

export const getAllList = async(req,res,next) =>{

    try{
  
        const email = req.params.email;
        const user = await List.find({email});
        
        if(!user){
            return res.status(404).json("User not found!");
        }
  
        res.status(200).json(user);
  
     }catch(error){
        next(error);
     }
  
  };
  
  
  

 export const onetask = async (req , res , next) => {

    try{
 
       const id = req.params.id;
       const userExist = await List.findById(id);
 
       res.status(200).json(userExist);
 
    }catch(error){
       next(error);
    }
 
 
 };

 export const updateTask = async(req , res , next) => {

    try{
 
       const id = req.params.id ;
 
       
  
       const updateData = await List.findByIdAndUpdate(id, req.body, {new:true});
       res.status(200).json(updateData);
 
 
    }catch( error){
       next(error);
    }
 }

 export const complete = async (req, res, next) => {
    try {
        const id = req.params.id;
 
        const requirment = await List.findById(id);
        if (!requirment) {
            return res.status(404).json({ message: 'Task not found' });
        }
 
        
        
          requirment.complete = true;
 
        const { update } = req.body;
 
        
 
        const updatedrequirment = await requirment.save();
        
        res.status(200).json(updatedrequirment);
    } catch (error) {
        next(error);
     }
 };
 export const deleteList = async(req , res ,next) => {

    try{
 
       const id = req.params.id ;
 
       
  
        await List.findByIdAndDelete(id);
       res.status(200).json('Task has been deleted');
 
 
    }catch( error){
       next(error);
    }
 };