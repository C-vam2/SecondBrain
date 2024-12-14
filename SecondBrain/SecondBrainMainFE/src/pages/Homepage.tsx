import { useNavigate } from "react-router-dom"

export function Homepage(){
    const navigate = useNavigate();


    return <div>
        <div>
            <button onClick={()=>{
                navigate('/signin');
            }}>Signin</button>
            <button onClick={()=>{
                navigate('/signup')
            }}>Signup</button>
        </div>
        <div className="h-screen w-screen ">
            This is home page;
        </div>
    </div>

}