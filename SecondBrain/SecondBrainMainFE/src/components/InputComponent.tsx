interface InputProps{
    placeHolder:string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reference?:any
    border?:boolean
}

export function Input(props:InputProps){
    return <input type="string" placeholder={props.placeHolder} ref={props.reference} className={`px-4 py-2 border-2 w-[100%] rounded hover:border-purple-600 focus:outline-none focus:ring focus:ring-purple-600 ${props.border && "border-2 border-purple-600"}`} required ></input>
}