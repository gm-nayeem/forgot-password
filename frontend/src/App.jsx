import './app.css';
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Error from "./pages/error/Error";
import Dashboard from "./pages/dashboard/Dashboard";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
