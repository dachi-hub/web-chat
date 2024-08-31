import "../style.scss"
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useState} from "react";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {auth, db, storage} from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import {Link, useNavigate} from "react-router-dom";

export const Register=()=>{
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };

    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Web Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="name"/>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <input style={{display:"none"}} type="file" id="file"/>
                    <label htmlFor="file">
                        <img src={process.env.PUBLIC_URL + '/img/icon-image.png'} alt={'img'}/>
                        <span>Add an avatar</span>
                    </label>
                    <button disabled={loading}>Sing up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p><Link to="/login">You do have an account? Login</Link></p>
            </div>
        </div>
    )
}