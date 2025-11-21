import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/Navbar/Navbar';
import IntroMain from './pages/IntroMain/IntroMain';
import LoginPage from './pages/LoginPage/LoginPage';
import MyPage from './pages/MyPage/MyPage';
import MainPage from './pages/MainPage/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<IntroMain />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
