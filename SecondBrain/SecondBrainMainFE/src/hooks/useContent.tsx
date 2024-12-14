import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent(modal:boolean){
    const [contents,setContents] = useState([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/content`,{headers:{
            'Authorization':localStorage.getItem("token")
        }}).then((response)=>{
            setContents(response.data.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[modal]);
    return contents;
}