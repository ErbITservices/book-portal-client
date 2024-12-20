import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigator = useNavigate();
  function handlelogout() {
    navigator("/book-list")
    
    localStorage.setItem("bookportellogin", "");
    localStorage.setItem("username", "");
    localStorage.setItem("user_id", "");
    // localStorage.setItem("district");
    localStorage.setItem("email", "");
    
  }
  return (
    
  
    <>
      <div className="navbar-container">
        <div className="logo">
          {" "}
          <img src="\gpmpng.png" alt="logo"  className="logo"/>
          
        </div>
        <div className="login-info">
          <AccountCircleOutlinedIcon />
          <h3> { 
            localStorage.getItem("username")}</h3>
          <button onClick={handlelogout} className="log-out">Log Out</button>
        </div>
      </div>
    </>
  );
}
export default Navbar;
