import { IoDocumentTextOutline, IoLogOutOutline } from "react-icons/io5";
import { TwitterIcon, } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarComponent } from "./SidebarComponent";
import { LuBrain } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export function Sidebar(){
    const navigate = useNavigate();
   
    function signout(){
        localStorage.removeItem('token');
        navigate('/')
        
        
    }

    return (
        <div className="h-full fixed left-0 top-0 w-72 bg-white border-r-2 pl-8 pt-4">
            <div className="flex items-center  pb-5 gap-3">
                <div className="text-purple-600 text-4xl">
                    <LuBrain />
                </div>
                <div className="text-2xl">
                    Brainly
                </div>
            </div>
            <SidebarComponent icon={<TwitterIcon size="lg"/>} title="Twitter Links"/>
            <SidebarComponent icon={<YoutubeIcon size="lg"/>} title="Youtube Links"/>
            <SidebarComponent icon={<IoDocumentTextOutline className="size-6" />} title="Other Links"/>
            <div className="absolute bottom-0 w-full pr-10" onClick={()=>{
                signout();
            }}>
                <SidebarComponent icon={<IoLogOutOutline className="size-6" />} title="Signout"/>
            </div>
        </div>
    )
}