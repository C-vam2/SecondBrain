import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/InputComponent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup () {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        console.log(username);
        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password
        });
        alert("You are signedup");
        navigate("/signin");
    }

    return <div className="justify-center items-center flex h-screen w-screen bg-black bg-opacity-30">
        <div className="bg-purple-300 gap-y-4 p-8 rounded-xl border">
            <div className="mb-4"><Input reference={usernameRef} placeHolder="Email"/></div>
            <div className="mb-4"><Input reference={passwordRef} placeHolder="Password"/></div>
            <div className="mt-4 flex justify-center"><Button  size="md" title="SignUp" varient="primary" fullwidth={true} loading={false} onClick={signup}/></div>
            <div className="flex gap-2 pt-3 mx-3 text-sm">
                <div>Already signed up?</div>
                
                <button className="text-purple-600 underline-offset-4" onClick={()=>{
                    navigate('/signin')
                }}><u>SignIn</u></button>
            </div>
        </div>
    </div>
}