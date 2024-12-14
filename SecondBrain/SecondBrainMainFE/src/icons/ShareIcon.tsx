import { IoShareSocialOutline } from "react-icons/io5";
import { IconProps, iconSizeVarients } from ".";
export function ShareIcon(props:IconProps){
    return <IoShareSocialOutline className={iconSizeVarients[props.size]} />
}