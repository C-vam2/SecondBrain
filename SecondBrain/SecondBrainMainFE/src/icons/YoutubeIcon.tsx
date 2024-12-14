import { TbBrandYoutube } from "react-icons/tb";
import { IconProps, iconSizeVarients } from ".";

export function YoutubeIcon(props:IconProps){
    return <div>
        <TbBrandYoutube className={iconSizeVarients[props.size]}/>
    </div>
}