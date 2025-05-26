import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Button from "@mui/material/Button";
import { useState } from "react";
import { userRequest } from "../../axiosReqMethods";

function ForgotPassword() {
  const [userdata, setuserdata] = useState({
    email: "",
  });
  
  const navigator = useNavigate();
   function handleinput(e) {
     const name = e.target.name;
     const value = e.target.value;

     setuserdata({
       ...userdata,
       [name]: value,
     });
   }
  async function handlesubmit() {
    try{const res = await userRequest.post("/api/v1/admin/sendpasswordlink", {
        userdata,
    });
    
    if (res.status === 200) {
      setuserdata({
        email: "",
      });
      
        
      alert("Check Your Register Email");
      navigator("/book-list");
    }
    }
    catch (e) {
        alert("Email Is  Invalid");
      }
  }
  return (
    <>
      <div className="background">
        {/* <Navbar /> */}
        <div className="container">
          <div className="login-container">
            <h1>
               Send Forgot Password Link
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
            
              <button type="submit" className="btn" onClick={handlesubmit}>
                Send
              </button>

            <Link to="/book-list">
              <p>Login</p>
            </Link>
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </>
  );
}
export default ForgotPassword;
