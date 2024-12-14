import { IoLogoTwitter } from "react-icons/io5";
import { IconProps, iconSizeVarients } from ".";

export function TwitterIcon(props:IconProps){
    return <div>
        <IoLogoTwitter className={iconSizeVarients[props.size]}/>
    </div>
}