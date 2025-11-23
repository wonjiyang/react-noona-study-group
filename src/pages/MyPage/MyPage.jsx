import { Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';

const MyPage = () => {
  const { pathname } = useLocation();

  return (
    <div className="responsive-container">
      <div className="rounded-4">
        <Nav>
          <Nav.Item
            className={`w-50 text-center fw-bold ${
              pathname === '/my/questions' ? 'border-primary' : ''
            }`}
            style={{ borderBottom: `2px solid #dddddd`, height: '0' }}
          >
            <Nav.Link
              className={`nav-link-gray ${
                pathname === '/my/questions' ? 'text-primary' : ''
              }`}
              as={Link}
              to="/my/questions"
            >
              기록
            </Nav.Link>
          </Nav.Item>
          <Nav.Item
            className={`w-50 text-center fw-bold ${
              pathname === '/my/bookmarks' ? 'border-primary' : ''
            }`}
            style={{ borderBottom: '2px solid #E8E8E8', height: '0' }}
          >
            <Nav.Link
              className={`nav-link-blue ${
                pathname === '/my/bookmarks' ? 'text-primary' : ''
              }`}
              as={Link}
              to="/my/bookmarks"
            >
              북마크
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Outlet />
      </div>
    </div>
  );
};

export default MyPage;
