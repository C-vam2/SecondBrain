import { ReactElement } from "react"

interface ButtonProps{
    varient:"primary"|"secondary",
    size:"sm"|"md"|"lg",
    title:string,
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    onClick?:()=>void,
    fullwidth?:boolean,
    loading?:boolean
} 

const varientStyles={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-300 text-purple-500",
}

const sizeStyles={
    "sm":"px-2 py-1 text-sm",
    "md":"px-4 py-2 text-md",
    "lg":"px-6 py-3 text-lg",
}

const defaultSyles = "rounded-xl  flex items-center justify-center";

export function Button(props:ButtonProps){
    return (
        <button className={`${varientStyles[props.varient]} ${defaultSyles} ${sizeStyles[props.size]} ${props.fullwidth ? "w-full":""} ${props.loading? "opacity-50":""}`} onClick={props.onClick} disabled={props.loading}>
            {props.startIcon && <div className="pr-2">{props.startIcon}</div>}
            {props.title}
            {props.endIcon}
        </button>
    )
}