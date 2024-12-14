import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import {z} from "zod";
import bcrypt, { hash } from 'bcrypt';
import { userMiddleware } from "./middleware";
import { JWT_SECRET } from "./config";
import { randHash } from "./utils"
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

let port: number = 3000;

app.post('/api/v1/signup',async (req,res)=>{
    
    try {
        const requiredBody = z.object({
            username: z.string().min(5).max(50).email(),
            password: z.string().min(8,{message:"Password must be atleast 8 charactesr long"}).max(40,{message:"password can not be more than 40 characters."}).refine((val)=>{
                let n: number = val.length;
                let isCapPresent: boolean=false;
                let isSmallPresent: boolean=false;
                for(let i=0;i<n;i++){
                    if(val[i]>='A' && val[i]<='Z')isCapPresent=true;
                    if(val[i]>='a' && val[i]<='z')isSmallPresent=true;
                }
                return isCapPresent && isSmallPresent;
            },{message:"password must contain atleast 1 Capital and 1 small letter."})

        });        
        const result = requiredBody.safeParse(req.body);

        if(result.success){
            const password =await bcrypt.hash(req.body.password,10);
            await UserModel.create({username:req.body.username,password:password});
            res.status(200).json({message:"Signup Successful"});
        }
        else{
            res.status(401).json({message:
                "Signup Failed",
                error:result.error
            });
        }
    } catch (err) {
        res.status(401).json({message:"Some error occured.",error:err})
    }
    return;
})

app.post('/api/v1/signin',async(req,res)=>{
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await UserModel.findOne({username:username});
        if(!user){
            res.status(404).json({msg:"User doesn't exist."});
            return;
        }

        const hashedPassword = user.password!;
        
        const result =await bcrypt.compare(password,hashedPassword);

        if(result){
            const token = jwt.sign({id:user._id},JWT_SECRET);
            res.status(200).json({msg:"signin Success.",token:token});
            return;
        }
        else{
            res.status(403).json({msg:"Wrong email or password provided."});
            return ;
        }

    } catch (err) {
        res.status(500).json({msg:"Internal Server Error."});
    }
});

app.post('/api/v1/content',userMiddleware,async (req,res)=>{
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type

    try {
        const content =await ContentModel.create({
            link,
            title,
            type,
            userId:req.userId,
            tags:[]

        });

        if(content){
            res.json({msg:"Content Added."});
            return;
        }
        else{
            res.status(411).json({msg:"Unable to add content."});
            return;
        }

    } catch (err) {
        res.status(401).json({msg:"Some error occured!"});
        return;
    }
});
app.get('/api/v1/content',userMiddleware,async(req,res)=>{
    try {
        const userId = req.userId;
        const contents = await ContentModel.find({userId:userId}).populate("userId","username");
        if(contents){
            res.json({data:contents});
            return 
        }        
        else{
            res.status(402).json({msg:"Some error occured"});
            return;
        }
    } catch (err) {
        res.status(403).json({
            msg:"Some error occured while getting the user's data"
        });
    }
});
app.delete('/api/v1/content',userMiddleware,async (req,res)=>{
try {
    const contentId = req.body.contentId;
    const userId = req.userId;
    const result= await ContentModel.deleteOne({_id:contentId,userId:userId});
    if(result){
        res.json({msg:"Deleted"})
    }
    else{
        res.status(401).json({msg:"Unable to retrive the content"});
    }
} catch (error) {
    res.status(401).json({msg:"Unable to delete requested content"});
    return;
}
});
app.post('/api/v1/brain/share',userMiddleware,async(req,res)=>{
    const isShare = req.body.share;

    if(isShare){
        const oldLink = await LinkModel.findOne({userId:req.userId});
        if(oldLink){
            res.json({hash:oldLink.hash});
            return;
        }
        const link = await LinkModel.create({
            hash:randHash(10),
            userId:req.userId
        });
        res.json({hash:link.hash});
        return;
    }
    else{
        await LinkModel.deleteOne({userId:req.userId});
        res.json({msg:"Removed Link"});
    }
    
});
app.get('/api/v1/brain/:shareLink',userMiddleware,async(req,res)=>{
    const link = req.params.shareLink;
    try {
        const isLinkAvailable = await LinkModel.findOne({hash:link}); 
        if(!isLinkAvailable){
            res.status(411).json({msg:"Link is not valid."});
            return;
        }
        const content = await ContentModel.find({userId:isLinkAvailable.userId}); 
        const user = await UserModel.findById(isLinkAvailable.userId);
        res.json({
            user:user,
            content:content
        })
        return;
    } catch (err) {
        res.status(401).json({msg:"Some error occured while getting the link"});
        return;
    }
});

app.listen(port,()=>{
    console.log(`Server is listening on post ${port}...`);
})