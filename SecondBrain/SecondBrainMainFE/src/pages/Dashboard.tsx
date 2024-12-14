import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { LuBrain } from "react-icons/lu";
import { useRecoilValue } from "recoil";
import { contentAtom } from "../atoms/contentAtom";

export function Dashboard(){
  const [modal,setModal] = useState(false);

  const contents = useContent(modal);
  const contentState = useRecoilValue(contentAtom);
  return <>
    <CreateContentModel open={modal} onClose={()=>{
      setModal(false);
    }}/>
    <Sidebar/>
    <div className="h-auto w-auto bg-grey-100 p-4 ml-72 z-0">
      <div className="flex justify-between gap-4 px-7 items-cneter">
        <div className="font-semibold text-3xl">
          All Notes
        </div>
        <div className="flex justify-end gap-4">
        <Button title="Add Content" size="md" varient="primary"startIcon={<PlusIcon size="md"/>} onClick={()=>{
          setModal(true);
        }}/>
          <Button title="Share Brain" size="md" varient="secondary" startIcon={<ShareIcon size="md"/>}/>
          
        </div>
      </div>

      <hr className="mt-6 "></hr>
        {contents.length ?<div className="flex gap-8 p-4 pt-10 flex-wrap">
          {
            contents.map(({title,type,link})=> type==contentState && <Card type={type} link={link} title={title}/>)
          }
        </div>:
        <div className="h-full w-full flex items-center pb-32 justify-center text-grey-300 g">
          <div className="h-[50%] w-[50%] gap-y-16">
            <LuBrain size={"h-full"} />
            <div className="text-center justify-center text-2xl">
              <b>
                Nothing to think about yet. Start feeding your second brain!
              </b>
            </div>
          </div>
        </div>}
    </div>
  </>
}