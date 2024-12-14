import {Request,Response,NextFunction} from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from './config';



export const userMiddleware = async (req:Request,res:Response,next:NextFunction)=>{
    const header = req.headers['authorization']!;
    try {
        const decoded = jwt.verify(header,JWT_SECRET) as JwtPayload;
        if(decoded){
            req.userId = decoded.id;
            next();
        }
        else{
            res.status(401).json({msg:"you are not signed in"});
            return;
        }
    } catch (error) {
        res.status(401).json({msg:"Unauthorized"});
        return ;
    }
}