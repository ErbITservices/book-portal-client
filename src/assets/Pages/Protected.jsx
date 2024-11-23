import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react"

function Protected(props) {
    const { Components } = props;
    const navigator = useNavigate();
    let login = localStorage.getItem("bookportellogin");
    useEffect(() => {
        console.log("protected");
        
        if (login) {
            navigator("/Dashboard");
        }
        else{
          
          navigator("/book-list");
        }
        
    },[login])
    return (
      <div>
        <SpeedInsights/>
        <Components></Components>
      </div>
    );
}
export default Protected;