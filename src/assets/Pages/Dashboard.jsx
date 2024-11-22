import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { userRequest } from "../../axiosReqMethods";
import Addbook from "../Components/Addbook";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BookData from "../Components/BookData";

function Dashboard() {
  const [schemelist, setschemelist] = useState();
  const [showaddbook, setshowaddbook] = useState(true);
  const [showbookdata, setshowbookdata] = useState(true);
  const [schemename, setschemename] = useState({ schemename: "" });
  const [tempsname,settempsname] = useState();
  const [scheme, setscheme] = useState();
  const [submited, setsubmited] = useState();

  const User_id = localStorage.getItem("user_id");
  useEffect(() => {
    const dataget = async () => {
      try {
        const res2 = await userRequest.get(
          `/api/v1/submited/alluser/${User_id}`
        );
        setsubmited(res2.data.data);
        const res = await userRequest.get(`/api/v1/scheam/getScheam`);
        setschemelist(res.data.allScheam);
        let arr = [];
        if (res2.data.data.length > 0) {
          for (let index = 0; index < res.data.allScheam.length; index++) {
            for (let i = 0; i < res2.data.data.length; i++) {
              let temp = res.data.allScheam[index].scheam_name;

              if (
                res2.data.data[i].scheamName !=
                  res.data.allScheam[index].scheam_name &&
                !arr.includes(res.data.allScheam[index].scheam_name) &&
                !arr.includes(res2.data.data[i].scheamName)
              ) {
                arr.push(temp);
                console.log(temp);
              }
              if (
                (res2.data.data[i].scheamName ===
                  res.data.allScheam[index].scheam_name &&
                  arr.includes(res.data.allScheam[index].scheam_name)) ||
                arr.includes(res2.data.data[i].scheamName)
              ) {
                arr.pop(temp);
                console.log("mihir");
              }
            }
          }

          setscheme(arr);
        } else {
          console.log("in");
          for (let index = 0; index < res.data.allScheam.length; index++) {
            arr.push(res.data.allScheam[index].scheam_name);
          }
          setscheme(arr);
        }

        console.log(res.data.allScheam);

        console.log(res2.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataget();
  }, []);
  function handleinput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setschemename({ ...schemename, [name]: value });
    console.log(schemename);
  }
  function handlecontinue() {
    console.log(schemename);
    
    if (schemename.schemename != "") {
      setshowaddbook(false);

      
    }
  }
  function handlesetshowbookdata(i) {
   
    setshowbookdata(false)

  }
  function backtodashboard() {
    
    setschemename({schemename: ""})
    setshowaddbook(true)
    setshowbookdata(true)
  }
  return (
    <>
      <Navbar />
      <div className="main-container">
        {showaddbook && showbookdata && (
          <div className="container">
            <div className="signup-container">
              <h1> Select Scheme,</h1>
              <div className="signup-inputarea">
                <label>Scheme Name</label>
                <select
                  className="input"
                  required
                  name="schemename"
                  value={schemename.schemename}
                  onChange={handleinput}
                >
                  <option value={""}>Select</option>
                  {scheme && scheme.map((i) => <option key={i}>{i}</option>)}
                </select>
              </div>

              <button onClick={handlecontinue} type="submit" className="btn">
                Continue
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Submission Date</th>
                  <th> Scheme Name</th>
                  <th> Download</th>
                </tr>
              </thead>
              <tbody>
                {submited &&
                  submited.map((i, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td key={i.submissionDate}>
                        {" "}
                        {i.submissionDate.slice(0, 10)}
                      </td>
                      <td key={i.scheamName}> {i.scheamName}</td>
                      <td key={index} onClick={()=>{
                        console.log(i.scheamName);
                         settempsname(i.scheamName)
                        handlesetshowbookdata(i.scheamName)}}>
                        <RemoveRedEyeOutlinedIcon />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {!showaddbook && <Addbook schemename={schemename.schemename} backtodashboard={backtodashboard} />}
        {!showbookdata && <BookData Scheme_name={tempsname} User_id={User_id} backtodashboard={backtodashboard}/>}
      </div>
      <Footer />
    </>
  );
}
export default Dashboard;
