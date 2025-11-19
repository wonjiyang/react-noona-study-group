import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/Navbar/Navbar';
import IntroMain from './pages/IntroMain/IntroMain';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        {' '}
        <Route path="/" element={<IntroMain />} />{' '}
      </Routes>
    </Router>
  );
}

export default App;
