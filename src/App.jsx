import Registration from "./assets/Pages/Registration";

import Login from "./assets/Pages/Login";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./assets/Pages/Dashboard";
import Protected from "./assets/Pages/Protected";
import { SpeedInsights } from "@vercel/speed-insights/react"
import ForgotPassword from "./assets/Pages/ForgotPassword";
import ConfirmPassword from "./assets/Pages/ConfirmPassword";
// import Addbook from "./assets/Pages/Addbook";

function App() {
  return (
    <>
    <SpeedInsights/>
      <BrowserRouter>
        <Routes>
        <Route
            path="/book-list"
            element={<Protected Components={Login} />}
          ></Route>
          <Route
            path="/Dashboard"
            element={<Protected Components={Dashboard} />}
          ></Route>
          <Route
            path="/Registration"
            element={<Protected Components={Registration} />}
          ></Route>
          <Route
            path="/Forgotpassword"
            element={<Protected Components={ForgotPassword} />}
          ></Route>
          <Route
            path="/ConfirmPassword/:id/:token"
            element={<ConfirmPassword />}
          ></Route>
          {/* <Route path="/ConfirmPassword/:id/:token" element={<Protected Components={ConfirmPassword} />} ></Route> */}
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
