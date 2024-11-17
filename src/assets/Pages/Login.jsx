import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Button from "@mui/material/Button";
import { useState } from "react";
import { userRequest } from "../../axiosReqMethods";

function Login() {
  const [userdata, setuserdata] = useState({
    email: "",
    password:""
  });
  
  const navigator = useNavigate();
   function handleinput(e) {
     const name = e.target.name;
     const value = e.target.value;

     setuserdata({
       ...userdata,
       [name]: value,
     });
     console.log(userdata);
   }
  async function handlesubmit() {
    try{const res = await userRequest.post("/api/v1/admin/login", {
        userdata,
    });
    
    console.log(res);

    if (res.status === 200) {
      setuserdata({
        email: "",
        password: "",
      });
      
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("user_id", res.data.user.id);
        // localStorage.setItem("district");
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("bookportellogin", "true");
      navigator("/Dashboard");
    }
    }
    catch (e) {
        alert("Email or Password Invalid");
      }
  }
  return (
    <>
      <div className="background">
        <Navbar />
        <div className="container">
          <div className="login-container">
            <h1>
              {" "}
              Welcome Back, <br /> Sign In
            </h1>
            <label>Email Address</label>
            <input
              className="input"
              type="text"
              placeholder="book@example.com"
              name="email"
              onChange={handleinput}
              value={userdata.email}
            />
            <label>Password</label>
            <input
              className="input"
              type="password"
              placeholder="Book@123"
              name="password"
              onChange={handleinput}
              value={userdata.password}
            />
              <button type="submit" className="btn" onClick={handlesubmit}>
                Sign In
              </button>

            <Link to="/Registration">
              <p>Sign Up</p>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
export default Login;
