import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/')

const UserSchema = new mongoose.Schema({
    username :{type:String,unique:true},
    password:String
});

export const UserModel = mongoose.model('Users',UserSchema);

const ContentSchema = new mongoose.Schema({
    link:String,
    type:{
        type:String,
    },
    title:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    userId : {type:mongoose.Types.ObjectId,ref:'Users',required:true}

});

export const ContentModel = mongoose.model('Contents',ContentSchema);

const LinkSchema = new mongoose.Schema({
    hash:{type:String,required:true},
    userId:{type:mongoose.Types.ObjectId,ref:"Users",required:true}
})

export const LinkModel = mongoose.model("Links",LinkSchema);