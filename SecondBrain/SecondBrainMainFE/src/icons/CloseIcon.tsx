import { MdOutlineClose } from "react-icons/md";
import { IconProps, iconSizeVarients } from ".";

export function CloseIcon(props:IconProps){
    return <MdOutlineClose  className={iconSizeVarients[props.size]} />;
}