import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
    const { Components } = props;
    const navigator = useNavigate();
    let login = localStorage.getItem("bookportellogin");
    useEffect(() => {
        console.log("protected");
        
        if (login) {
            navigator("/Dashboard");
        }
        
    },[login])
    return (
      <div>
        <Components></Components>
      </div>
    );
}
export default Protected;