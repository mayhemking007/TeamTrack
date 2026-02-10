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
       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-xl w-[30rem] px-8 py-8">

                <h1 className="text-3xl font-bold text-white text-center mb-8">
                Sign Up
                </h1>

                <div>
                <div className="mb-5">
                    <label className="block text-slate-300 mb-2 text-sm">
                    Name
                    </label>
                    <input
                    type="text"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    name="name"
                    id="name"
                    placeholder="e.g. John Doe"
                    className="w-full rounded-md bg-slate-800 border border-slate-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-slate-300 mb-2 text-sm">
                    Email
                    </label>
                    <input
                    type="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    name="email"
                    id="email"
                    placeholder="example@mail.com"
                    className="w-full rounded-md bg-slate-800 border border-slate-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-slate-300 mb-2 text-sm">
                    Username
                    </label>
                    <input
                    type="text"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    name="username"
                    id="username"
                    placeholder="Username"
                    className="w-full rounded-md bg-slate-800 border border-slate-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-slate-300 mb-2 text-sm">
                    Password
                    </label>
                    <div className="flex gap-2">
                    <input
                        type="password"
                        onChange={(e) => {
                        setPassword(e.target.value);
                        }}
                        name="password"
                        id="password"
                        ref={passRef}
                        placeholder="Write Your Password"
                        className="flex-1 rounded-md bg-slate-800 border border-slate-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        onClick={passwordToggle}
                        className="px-3 py-2 text-sm rounded-md bg-slate-700 text-slate-200 hover:bg-slate-600 transition"
                    >
                        Show
                    </button>
                    </div>
                </div>
                </div>

                <button
                onClick={submitHandler}
                type="submit"
                className="w-full mt-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition"
                >
                Submit
                </button>

                <p className="text-center text-slate-400 text-sm mt-6">
                Already signed up?{" "}
                <a href="/login" className="text-indigo-400 hover:underline">
                    Login here
                </a>
                </p>

            </div>
         </div>

    )
}