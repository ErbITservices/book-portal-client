import Registration from "./assets/Pages/Registration";

import Login from "./assets/Pages/Login";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./assets/Pages/Dashboard";
// import Addbook from "./assets/Pages/Addbook";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/Registration"
            element={<Registration title="Registration" />}
          />
          <Route path="/Dashboard" element={<Dashboard title="Dashboard" />} />
          {/* <Route path="/Addbook" element={<Addbook title="Addbook" />} /> */}
          
          <Route path="/" element={<Login title="Login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
