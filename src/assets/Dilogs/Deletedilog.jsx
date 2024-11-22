import {HashLoader} from "react-spinners";
function Deletedilog({handledelete , deletedata , setdeletedilog}) {
    return (
      <div className="dilog">
        <div className="dilog-container">
        <h1>
          Delete
        </h1>
        <h3>Are You Sure You Want To Delete? <br/>Once You Delete, You Cannot Get Back This Book Data. </h3>
        <div className="btn-container"> 
          <button className="cancel btn" onClick={()=> setdeletedilog(false)}>Cancel</button>
          <button className="okay btn" onClick={()=>handledelete(deletedata)}> Delete</button>
        </div>
        </div>
       
      </div>
    );
}
export default Deletedilog