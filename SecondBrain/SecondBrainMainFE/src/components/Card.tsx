import { ShareIcon } from "../icons/ShareIcon";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri"; 

interface CardProps{
    title:string,
    link:string,
    type:string,

}

export function Card(props:CardProps){
    let customLink: string = props.link;
    customLink = customLink.replace("watch","embed");
    customLink = customLink.replace("?v=","/"); 

    return <div className="h-[350px] w-[300px] bg-white rounded-md border border-grey-300 p-3 overflow-hidden">
            <div className="flex items-center justify-between">
                <div className="gap-2 flex items-center">
                    <div className="text-zinc-400">
                    <IoDocumentTextOutline />
                    </div>
                    <div className="font-semibold overflow-hidden">{props.title}</div>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                    
                    <ShareIcon size="md"/>
                    <RiDeleteBin5Line />
                </div>
            </div>
            <a href={props.link} target="_blank" rel="noopener noreferrer" title={props.link}>
                <div className="pt-4 h-[250px] w-full">
                    {props.type==="youtube" && 
                        <iframe width="100%" height="100%" className="rounded-md" src={customLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    }
                    {props.type === "twitter" && <div  className="h-[250px]">
                            <blockquote className="twitter-tweet ">
                                <a href={props.link.replace("x.com","twitter.com")}></a> 
                            </blockquote>
                    </div>}
                    {props.type=="others" && <iframe className="w-full h-full" src={props.link} frameBorder="0" allowFullScreen></iframe>}
                </div>
            </a>
            
        </div>
   
}
