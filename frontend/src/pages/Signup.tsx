import { useRef, useState} from "react"
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";

export default function Signup(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const passRef = useRef<HTMLInputElement>(null);
    const {SignUp} = useAuth();
    const navigate = useNavigate();
    
    const submitHandler = async () => { 
        try{
            setLoading(true);
            const response = await SignUp({
                name : name,
                email : email,
                username : username,
                password : password
            });
            if(response.success){
                setLoading(false);
                navigate('/login');
            }
            else{
                console.log(response.data.error);
                alert("Error in Signing up: " + response.data.error);
                setLoading(false);
            }
        }
        catch(e){
            console.log(e);
            alert("SignUp Failed");
            setLoading(false);
        }
        
    }

    const passwordToggle = () => {
        const val = passRef.current!.type;
        passRef.current!.type = val === "password" ? "text" : "password";
    }

    if(loading){
        return(
            <div>
                Loading.....
            </div>
        )
    }
    return (
        <div className="bg-blue-200 h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg border-1 shadow-md w-120 h-85 px-4 py-4">
                <h1>Sign Up</h1>
                <div>
                    <div>
                        <label>Name</label>
                        <input type="text" onChange={(e) => {
                            setName(e.target.value)
                        }} name="name" id="name" placeholder="e.g. John Doe" className="border-1 rounded-md mx-4 my-4 px-2 py-1" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" onChange={(e) => {
                            setEmail(e.target.value)
                        }} name="email" id="email" placeholder="example@mail.com" className="border-1 rounded-md mx-4 my-4 px-2 py-1" />
                    </div>
                    <div>
                        <label>Username</label>
                        <input type="text" onChange={(e) => {
                            setUsername(e.target.value)
                        }} name="username" id="username" placeholder="Username" className="border-1 rounded-md mx-4 my-4 px-2 py-1"/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" onChange={(e) => {
                            setPassword(e.target.value)
                        }} name="password" id="password" ref={passRef} placeholder="Write Your Password" className="border-1 rounded-md mx-4 my-4 px-2 py-1" />
                        <button onClick={passwordToggle}>Show</button>
                    </div>
                </div>
                <button onClick={submitHandler} type="submit">Submit</button>
            </div>
        </div>
    )
}