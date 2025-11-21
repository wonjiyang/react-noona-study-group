import { Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/Navbar/Navbar';
import IntroMain from './pages/IntroMain/IntroMain';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyPage from './pages/MyPage/MyPage';
import QuestionList from './pages/MyPage/components/QuestionList/QuestionList';
import BookmarkList from './pages/MyPage/components/BookmarkList/BookmarkList';
import Login from './pages/LoginPage/Login';
import MainPage from './MainPage/MainPage';

function App() {
  return (
    <>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<IntroMain />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my" element={<MyPage />}>
          <Route path="questions" element={<QuestionList />} />
          <Route path="bookmarks" element={<BookmarkList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
