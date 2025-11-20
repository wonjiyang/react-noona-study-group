import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomNavbar from "./components/Navbar/Navbar";
import IntroMain from "./pages/IntroMain/IntroMain";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MainPage from "./MainPage/MainPage";

function App() {
  return (
    <>
      <CustomNavbar />
      <Routes>
        {" "}
        <Route path="/" element={<IntroMain />} />{" "}
        <Route path="/main-page" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
