import {HashLoader} from "react-spinners";
function Submitdilog({handlesubmit , setsubmitdilog , setschemename}) {
    return (
      <div className="dilog">
        <div className="dilog-container">
        <h1>
          Submit
        </h1>
        <h3>Are You Sure You Want To Submit? <br/>Once You Submit, You Cannot Edit, Delete, or Add Books </h3>
        <div className="btn-container"> 
          <button className="cancel btn" onClick={()=> setsubmitdilog(false)}>Cancel</button>
          <button className="okay btn" onClick={()=>{
            
    setschemename({schemename: ""})
            handlesubmit()}}> Submit</button>
        </div>
        </div>
       
      </div>
    );
}
export default Submitdilog