import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Button from "@mui/material/Button";
import { useState } from "react";
import { userRequest } from "../../axiosReqMethods";

function ConfirmPassword() {
  const [userdata, setuserdata] = useState({
    cpassword:"",
    password:""
  });
  
  const { id, token } = useParams();
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
    if (userdata.password === userdata.cpassword) {
      try{const res = await userRequest.post(`/api/v1/admin/${id}/${token}`, {
        userdata,
    });
    
    console.log(res);

    if (res.status === 200) {
      alert("Password Updated")
      
      alert("Your Password is Reset Successfully");
        
      navigator("/book-list");
    }
    }
    catch (e) {
        alert("Try Again...");
      }
    }
    else{
      alert("Confirm Password Not Matched With Password")
    }
    
  }
  return (
    <>
      <div className="background">
        {/* <Navbar /> */}
        <div className="container">
          <div className="login-container">
            <h1>
               Sign In
            </h1>
            <label>Password</label>
            <input
              className="input"
              type="password"
              placeholder="Book@123"
              name="password"
              onChange={handleinput}
              value={userdata.password}
            />
            <label>Confirm Password</label>
            <input
              className="input"
              type="password"
              placeholder="Book@123"
              name="cpassword"
              onChange={handleinput}
              value={userdata.cpassword}
            />
              <button type="submit" className="btn" onClick={handlesubmit}>
                Sign In
              </button>

            
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </>
  );
}
export default ConfirmPassword;
