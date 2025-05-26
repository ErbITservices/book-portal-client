import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { userRequest } from "../../axiosReqMethods";

function Protected(props) {
    const { Components } = props;
  const navigator = useNavigate();
 const [userdata, setuserdata] = useState({
   email: localStorage.getItem("gpm-email"),
   password: localStorage.getItem("gpm-password"),
 });
  
  
    useEffect( () => {
      
        async function isLogin() {
          if (localStorage.getItem("bookportellogin")) {
            
            try {
              const res = await userRequest.post("/api/v1/admin/login", {
                userdata,
              });


              if (res.status === 200) {
                setuserdata({
                  email: "",
                  password: "",
                });

                navigator("/Dashboard");
              }
            } catch (e) {
              
              navigator("/book-list");
              alert("Email or Password Invalid");
              
            }
          } else {
            navigator("/book-list");
          }
        }
      isLogin()
        
    },[])
    return (
      <div>
        <SpeedInsights/>
        <Components></Components>
      </div>
    );
}
export default Protected;