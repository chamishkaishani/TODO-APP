import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },
    work:{
        type:String,
        required:true,
    },
      date:{
        type: Date,
        required: true,

        
        

    },
   
    time : {
        type: String,
        required: true,

    },

    complete : {
        type :Boolean,
        default : false
    },

  
    
},{ timestamps:true });

const List = mongoose.model('List',listSchema);

export default List;