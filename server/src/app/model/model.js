import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  
  name: {
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  pass:{
    type:String,
    require:true
  }

})

const User = new mongoose.model("User",UserSchema);

export default User;