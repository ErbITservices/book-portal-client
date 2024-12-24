import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Button from "@mui/material/Button";
import Footer from "../Components/Footer";
import { useState } from "react";
import { userRequest } from "../../axiosReqMethods";

function Registration() {
  const [userdata, setuserdata] = useState({
    username: "",
    contect_name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    
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
    if (userdata.password===userdata.cpassword) {
      const res = await userRequest.post("/api/v1/admin/register", {
        userdata,
      });
      if (res.status === 200) {
        setuserdata({
          username: "",
          contect_name: "",
          email: "",
          phone: "",
          password: "",
          cpassword: "",
        }
        );
        
      alert("You Register Successfully");
        navigator("/book-list")
      }
      else{
        
      alert("You Can Not Same Email And Contact Name In Multiple Accouts");
      }
    }
    else {
      alert("Your Confirm Password is not Matched")
    }
    
  }

  return (
    <>
      <div className="background">
        {/* <Navbar /> */}
        <div className="container">
          <div className="signup-container">
            <h1>Welcome, Sign Up</h1>
            <div className="signup-inputarea">
              <label>Member Name</label>
              <input
                className="input"
                type="text"
                placeholder="Name"
                onChange={handleinput}
                name="username"
                value={userdata.username}
              />
            </div>
            <div className="signup-inputarea">
              <label>Contact Name</label>
              <input
                className="input"
                type="text"
                placeholder="Name"
                onChange={handleinput}
                name="contect_name"
                value={userdata.contect_name}
              />
            </div>
            <div className="signup-inputarea">
              <label>Mobile Number </label>
              <input
                className="input"
                type="number"
                placeholder="Mobile"
                onChange={handleinput}
                name="phone"
                value={userdata.phone}
              />
            </div>

            <div className="signup-inputarea">
              <label>Email Address </label>
              <input
                className="input"
                type="text"
                placeholder="book@example.com"
                onChange={handleinput}
                name="email"
                value={userdata.email}
              />
            </div>

            <div className="signup-inputarea">
              <label>Password </label>
              <input
                className="input"
                type="password"
                placeholder="Book@123"
                onChange={handleinput}
                name="password"
                value={userdata.password}
              />
            </div>

            <div className="signup-inputarea">
              <label> Conforim Password </label>
              <input className="input" type="password" placeholder="Book@123" onChange={handleinput}
                name="cpassword"
                value={userdata.cpassword} />
            </div>

            <button type="submit" onClick={handlesubmit} className="btn">
              {" "}
              Sign Up
            </button>
            <Link to="/book-list">
              <p>Already Login, Sign In</p>
            </Link>
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </>
  );
}
export default Registration;
