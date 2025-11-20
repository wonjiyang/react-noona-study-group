import { Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/Navbar/Navbar';
import IntroMain from './pages/IntroMain/IntroMain';
import Login from './pages/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<IntroMain />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
