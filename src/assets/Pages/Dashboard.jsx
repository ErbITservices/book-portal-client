import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { userRequest } from "../../axiosReqMethods";
import Addbook from "../Components/Addbook";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BookData from "../Components/BookData";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

function Dashboard() {
  const [schemelist, setschemelist] = useState();
  const [showaddbook, setshowaddbook] = useState(true);
  const [showbookdata, setshowbookdata] = useState(true);
  const [schemename, setschemename] = useState({ schemename: "" });
  const [tempsname, settempsname] = useState();
  const [scheme, setscheme] = useState();
  const [submited, setsubmited] = useState();
  const [submiteddate, setsubmiteddate] = useState();

  const User_id = localStorage.getItem("user_id");
  useEffect(() => {
    const dataget = async () => {
      try {
        const res2 = await userRequest.get(
          `/api/v1/submited/alluser/${User_id}`
        );
        setsubmited(res2.data.data);
        const res = await userRequest.get(`/api/v1/scheam/getActiveScheam`);
        setschemelist(res.data.Scheam
        );
        let arr = [];
        
        if (res2.data.data.length > 0) {
          for (let index = 0; index < res.data.Scheam
            .length; index++) {
            for (let i = 0; i < res2.data.data.length; i++) {
              let temp = res.data.Scheam
              [index].scheam_name;

              if (
                res2.data.data[i].scheamName !=
                  res.data.Scheam
                  [index].scheam_name &&
                !arr.includes(res.data.Scheam
                  [index].scheam_name) &&
                !arr.includes(res2.data.data[i].scheamName)
              ) {
                arr.push(temp);
              }
              if (
                (res2.data.data[i].scheamName ===
                  res.data.Scheam
                  [index].scheam_name &&
                  arr.includes(res.data.Scheam
                    [index].scheam_name)) ||
                arr.includes(res2.data.data[i].scheamName)
              ) {
                arr.pop(temp);
              }
            }
          }

          setscheme(arr);
        } else {
          for (let index = 0; index < res.data.Scheam
            .length; index++) {
            arr.push(res.data.Scheam
              [index].scheam_name);
          }
          setscheme(arr);
        }

      } catch (error) {
        alert("Somthing Wrong!! Try Again");
      }
    };
    dataget();
  }, []);
  async function handlerefresh() {
      try {
        const res2 = await userRequest.get(
          `/api/v1/submited/alluser/${User_id}`
        );
        setsubmited(res2.data.data);
        const res = await userRequest.get(`/api/v1/scheam/getActiveScheam`);
        setschemelist(res.data.Scheam
        );
        let arr = [];
        if (res2.data.data.length > 0) {
          for (let index = 0; index < res.data.Scheam
            .length; index++) {
            for (let i = 0; i < res2.data.data.length; i++) {
              let temp = res.data.Scheam
              [index].scheam_name;

              if (
                res2.data.data[i].scheamName !=
                  res.data.Scheam
                  [index].scheam_name &&
                !arr.includes(res.data.Scheam
                  [index].scheam_name) &&
                !arr.includes(res2.data.data[i].scheamName)
              ) {
                arr.push(temp);
              }
              if (
                (res2.data.data[i].scheamName ===
                  res.data.Scheam
                  [index].scheam_name &&
                  arr.includes(res.data.Scheam
                    [index].scheam_name)) ||
                arr.includes(res2.data.data[i].scheamName)
              ) {
                arr.pop(temp);
              }
            }
          }

          setscheme(arr);
        } else {
          for (let index = 0; index < res.data.Scheam
            .length; index++) {
            arr.push(res.data.Scheam
              [index].scheam_name);
          }
          setscheme(arr);
        }

      } catch (error) {
        alert("Somthing Wrong!! Try Again");
      }
    
  }
  function handleinput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setschemename({ ...schemename, [name]: value });
  }
  function handlecontinue() {

    if (schemename.schemename != "") {
      setshowaddbook(false);
    }
  }
  function handlesetshowbookdata(i) {
    setshowbookdata(false);
  }
  function backtodashboard() {
    setschemename({ schemename: "" });
    setshowaddbook(true);
    setshowbookdata(true);
  }
  return (
    <>
      <Navbar />
      <div className="main-container">
        {showaddbook && showbookdata && (
          <div className="container">
            <div className="signup-container">
              <h1> Select Book-List</h1>
              <div className="signup-inputarea">
                <label>List Name</label>
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
                 Enter <ArrowForwardOutlinedIcon/>
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th> List Name</th>
                  <th> Submission Date</th>
                  <th> Download</th>
                </tr>
              </thead>
              <tbody>
                {submited &&
                  submited.map((i, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      
                      <td key={i.scheamName}> {i.scheamName}</td>
                      <td key={i.submissionDate}>
                        {" "}
                        {i.submissionDate.slice(0, 10)}
                      </td>
                      <td
                        key={index}
                        className="eye"
                        onClick={() => {
                          setsubmiteddate(i.createdAt);
                          settempsname(i.scheamName);
                          handlesetshowbookdata(i.scheamName);
                        }}
                      >
                        <RemoveRedEyeOutlinedIcon />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {!showaddbook && (
          <Addbook
            schemename={schemename.schemename}
            setschemename={setschemename}
            backtodashboard={backtodashboard}
            handlerefresh={handlerefresh}
          />
        )}
        {!showbookdata && (
          <BookData
            Scheme_name={tempsname}
            User_id={User_id}
            submiteddate = {submiteddate}
            backtodashboard={backtodashboard}
          />
        )}
      </div>
     {/* <Footer /> */}
    </>
  );
}
export default Dashboard;
