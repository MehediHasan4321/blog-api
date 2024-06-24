const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type:String,
      required:true
    },
    email: {
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true,
      
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined", "blocked"],
      default: "pending",
    },
  },{timestamps:true,id:true});

const User = model("User", UserSchema);

module.exports = User;
