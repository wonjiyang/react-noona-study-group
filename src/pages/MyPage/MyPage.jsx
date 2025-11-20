import { Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';

const MyPage = () => {
  const { pathname } = useLocation();

  return (
    <div style={{ minHeight: '100vh', background: '#dddddd', padding: '50px 16px' }}>
      <div
        className='rounded-4'
        style={{ width: '100%', maxWidth: '600px', background: '#fff', margin: '60px auto 0' }}
      >
        <Nav>
          <Nav.Item
            className={`w-50 text-center fw-bold ${pathname === '/my/questions' ? 'border-primary' : ''}`}
            style={{ borderBottom: `2px solid #dddddd` }}
          >
            <Nav.Link
              className={`${pathname === '/my/questions' ? 'text-primary' : ''}`}
              as={Link}
              to='/my/questions'
              style={{ color: '#D3D3D3' }}
            >
              기록
            </Nav.Link>
          </Nav.Item>
          <Nav.Item
            className={`w-50 text-center fw-bold ${pathname === '/my/bookmarks' ? 'border-primary' : ''}`}
            style={{ borderBottom: '2px solid #E8E8E8' }}
          >
            <Nav.Link
              className={`${pathname === '/my/bookmarks' ? 'text-primary' : ''}`}
              as={Link}
              to='/my/bookmarks'
              style={{ color: '#D3D3D3' }}
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
