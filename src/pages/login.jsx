import "./login.css";
import { useState } from "react";
import axios from "axios";

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(){
    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login",
        {
        email:email,
        password:password
        }
    ).then((res)=>{
        
        localStorage.setItem("token",res.data.token)
        if (res.data.user.type === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
        
    }

    ).catch((err)=>{
        console.log("Login error:", err.response?.data || err.message)
    })
  }
 

  return (
    <div className="w-full h-[100vh] pic-bg flex justify-center items-center">
      <div className="w-[400px] h-[400px] backdrop-blur-md rounded-lg flex flex-col items-center justify-center relative">
        <h1 className="text 3xl text-white absolute top-[40px] text-center">
          Login
        </h1>
        <input
          type="text"
          placeholder="Enter your email address"
          className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[40px] px-[5px] mb-[20px]"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[40px] px-[5px]"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="w-[80%] bg-red-600 text-white h-[50px] rounded-lg absolute bottom-[40px]"
        onClick={handleLogin}>
           Login
        </button>
      </div>
    </div>
  );
}
