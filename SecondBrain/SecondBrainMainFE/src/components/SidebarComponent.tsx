import { ReactElement } from "react"
import { useSetRecoilState } from "recoil"
import { contentAtom } from "../atoms/contentAtom"

export function SidebarComponent({icon,title}:{
    icon:ReactElement,
    title:string
}){
    const setContentState=useSetRecoilState(contentAtom);
    return <button onClick={()=>{setContentState(title.split(' ')[0].toLowerCase())}} className="w-[85%]">
        <div className="flex  my-3 gap-4 w-full text-grey-900 size-10 pl-3 cursor-pointer hover:bg-purple-300 items-center rounded-md mr-5">
        {icon}
        {title}
    </div>
    </button>
}