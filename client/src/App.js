import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ReviewModal from './components/ReviewModal';
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Contact from "./components/Contact/contact";
import Navbar from "./components/Navbar/Navbar";
import Volunteer from "./components/Volunteer/Volunteers.jsx";
import Profile from "./components/Profile/index.jsx";
import AboutPage from "./components/AboutPage/AboutPage.jsx";
import HowToUse from "./components/HowToUse/HowToUse.jsx";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Requests from "./components/Requests/reuests";
import AdminPanel from "./components/AdminPanel/AdminPanel.jsx";
import Rate from "./components/Rating/index.jsx";
import NavigateButton from './NavigateButton';
import DisplayReviews from './components/displayReviews.jsx';

function App() {
  const isAdmin = localStorage.getItem("isAdmin");
  const userToken = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <BrowserRouter>
      {userToken && <Navbar isAdmin={isAdmin} handleLogout={handleLogout} />}
      <NavigateButton />
      <Routes>
        {userToken && <Route path="/" exact element={<Main />} />}
        {isAdmin && <Route path="/adminPanel" exact element={<AdminPanel />} />}
        {isAdmin && <Route path="/DisplayReviews" exact element={<DisplayReviews />} />}
        <Route path="/review" exact element={<ReviewModal />} />
        <Route path="/Volunteers" exact element={<Volunteer />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/contact" exact element={<Contact />} />
        <Route path="/requests" exact element={<Requests />} />
        <Route path="/AboutPage" exact element={<AboutPage />} />
        <Route path="/HowToUse" exact element={<HowToUse />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
