import { HiOutlinePlusSm } from "react-icons/hi";
import {IconProps, iconSizeVarients} from "."

export function PlusIcon(props:IconProps){
    return <HiOutlinePlusSm className={iconSizeVarients[props.size]}/>
}