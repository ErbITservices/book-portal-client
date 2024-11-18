import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { userRequest } from "../../axiosReqMethods";
import Addbook from "../Components/Addbook";

function Dashboard() {
  const [schemelist, setschemelist] = useState();
  const [showaddbook, setshowaddbook] = useState(true);
  const [schemename, setschemename] = useState({schemename:""});
  useEffect(() => {
    const dataget = async () => {
      try {
        const res = await userRequest.get(`/api/v1/scheam/getScheam`);
        setschemelist(res.data.allScheam);
        console.log(res.data.allScheam);
        
      } catch (error) {
        console.log(error);
      }
    };
    dataget();
  }, []);
  function handleinput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setschemename({ ...schemename, [name]: value })
    console.log(schemename);
    

  }
  function handlecontinue() {
    if (schemename.schemename != "") {
      setshowaddbook(false);
    }
  }
  return (
    <>
      <Navbar />
      <div className="main-container">
        {showaddbook && (
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
                  {schemelist &&
                    schemelist.map((i) => (
                      <option key={i.scheam_name}>{i.scheam_name}</option>
                    ))}
                </select>
              </div>

              <button onClick={handlecontinue} type="submit" className="btn">
                Continue
              </button>
            </div>
          </div>
        )}
        {!showaddbook && <Addbook schemename={schemename.schemename} />}
      </div>
      <Footer />
    </>
  );
}
export default Dashboard;
