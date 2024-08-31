import "../style.scss"
import {useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import {auth} from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login=()=>{
    const [err, setErr]=useState(false)
    const navigate= useNavigate()
    const handleSubmit= async (e)=> {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (err) {
            setErr(true)
        }
    }
    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Web Chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <button>Sing in</button>
                </form>
                <p><Link to="/register">You dont have an account?Register</Link></p>
            </div>
        </div>
    )
}