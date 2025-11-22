import { Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/Navbar/Navbar";
import IntroMain from "./pages/IntroMain/IntroMain";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyPage from "./pages/MyPage/MyPage";
import QuestionList from "./pages/MyPage/components/QuestionList/QuestionList";
import BookmarkList from "./pages/MyPage/components/BookmarkList/BookmarkList";
import Login from "./pages/LoginPage/Login";
import MainPage from "./MainPage/MainPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };
  return (
    <>
      <CustomNavbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<IntroMain />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
        <Route path="/my" element={<MyPage />}>
          <Route path="questions" element={<QuestionList />} />
          <Route path="bookmarks" element={<BookmarkList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
