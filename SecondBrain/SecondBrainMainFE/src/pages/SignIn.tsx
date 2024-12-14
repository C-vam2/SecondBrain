import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/InputComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signin(){
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    

    async function signin () {
        
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        console.log(username);
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username,
            password
        });
        
        localStorage.setItem("token",response.data.token);
        navigate("/dashboard");
    }

    
    return <div className="justify-center items-center flex h-screen w-screen bg-black bg-opacity-30">
        <div className="bg-purple-300 gap-y-4 p-8 rounded-xl border">
            <div className="mb-4"><Input reference={usernameRef} placeHolder="Email" /></div>
            <div className="mb-4"><Input reference={passwordRef} placeHolder="Password"/></div>
            <div className="mt-4 flex justify-center"><Button  size="md" title="Signin" varient="primary" fullwidth={true} loading={false} onClick={signin}/></div>
            <div className="flex gap-2 pt-3 mx-3 text-sm">
                <div>Not a user?</div>
                
                <button className="text-purple-600 underline-offset-4" onClick={()=>{
                    navigate('/signup')
                }}><u>Signup</u></button>
            </div>
        </div>
    </div>
}