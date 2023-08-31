import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function UserRegister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [ ,setCookie] = useCookies(['user-id','user'])

    const handleRegister = async () => {
        try {
            await axios({
                method: 'post',
                url: 'http://localhost:5000/register-user',
                data: {
                    name,
                    email,
                    password
                }
            });
            alert(`user ${name} registered successfully`)
            setCookie("user-id", email);
            setCookie("userName", name)
            navigate('/')
        } catch (error) {
            setMessage("Error: " + error.response.data.error);
        }
    };

    return (
        <div style={{ fontSize: "30px" }}>
            <div className="container text-white">
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <dl className="p-5 bg-dark rounded-4">
                        <div className="text-center text-white"><b>Register User</b></div>
                        <dt>User Name</dt>
                        <dd><input className="form-control" type="text" style={{ fontSize: "30px" }} onChange={(e) => setName(e.target.value)} /></dd>
                        <dt>Email</dt>
                        <dd><input type="email" className="form-control" style={{ fontSize: "30px" }} onChange={(e) => setEmail(e.target.value)} /></dd>
                        <dt>Password</dt>
                        <dd><input className="form-control" type="password" style={{ fontSize: "30px" }} onChange={(e) => setPassword(e.target.value)} /></dd>
                        <div className="my-5">
                            <button className="btn btn-primary w-100" style={{ fontSize: "30px" }} onClick={handleRegister}>Register</button>
                        </div>
                        <div className="text-center text-danger">{message}</div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
