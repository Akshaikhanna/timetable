import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Forgot from "./Components/Forgot";
import ResetPassword from "./Components/ResetPassword";
import Login from "./Components/Login";
import Otp from "./Components/Otp";

import Dashboard from "./Components/Dashboard";
export const url = "http://localhost:8080";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin/credentials" element={<Login />} />
          <Route path="verify/email" element={<Forgot />} />
          <Route path="verify/otp/email/:id" element={<Otp />} />
          <Route path="reset/password/:id" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
