import { useRef, useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./InputComponent";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType{
    Youtube="youtube",
    Twitter="twitter",
    Others="other"
}

export function CreateContentModel({open,onClose}:{
    onClose:()=>void,
    open:boolean
}){

    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [typeState,setTypeState] = useState(ContentType.Youtube);

    async function submit(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const type = typeState;
        if(title?.length==0 || link?.length==0){
            alert("Please enter all necessary details")
            return;
        }
        const response = await axios.post(`${BACKEND_URL}/api/v1/content`,{
            title,
            type,
            link
        },{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        });
        alert(response.data.msg);
        onClose();
    }

    return <div>
        {open && <div className="bg-black w-screen h-screen top-0 left-0 bg-opacity-30 fixed flex justify-center items-center">
            <div className="bg-white p-6 space-y-4 rounded-md border-2">
                <div className="flex justify-between items-center text-2xl pb-4 font-semibold">
                    <div>
                        Add Content
                    </div>
                    <div className="cursor-pointer" onClick={onClose}>
                        <CloseIcon size="md"/>
                    </div>
                </div>
                <div >
                    <Input reference={titleRef} placeHolder="Title"/>
                </div>
                <div>
                    <Input reference={linkRef} placeHolder="Link"/>
                </div>
                <div>
                    <div className="font-semibold  flex justify-center pb-3">
                        Link Type
                    </div>
                    <div className="flex gap-2 justify-center">

                        <Button varient={typeState==ContentType.Youtube? "primary":"secondary"} size="sm" title="Youtube" onClick={()=>setTypeState(ContentType.Youtube)}/>
                        <Button varient={typeState==ContentType.Twitter? "primary":"secondary"} size="sm" title="Twitter" onClick={()=>setTypeState(ContentType.Twitter)}/>
                        <Button varient={typeState==ContentType.Others? "primary":"secondary"} size="sm" title="Others" onClick={()=>setTypeState(ContentType.Others)}/>
                    </div>
                </div>

                <div className="pt-4 flex justify-center">
                    <Button size="md" title="Submit" varient="primary" onClick={submit} />
                </div>
            </div>    
        </div>}
    </div>
}



