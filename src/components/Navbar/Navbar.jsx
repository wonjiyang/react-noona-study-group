import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.style.css';
import { Link, useNavigate } from 'react-router-dom';

const CustomNavbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };
  return (
    <Navbar bg='primary' className='navbar' variant='dark'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='navbar-brand'>
          mentorMe
        </Navbar.Brand>
        <Nav className='navbar-nav'>
          <Nav.Item>
            <Nav.Link as={Link} to='/my/bookmarks' className='nav-link' style={{ color: 'white' }}>
              <FontAwesomeIcon icon={faBookmark} /> 북마크
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as='span'
              onClick={isLoggedIn ? handleLogoutClick : () => navigate('/login')}
              style={{ color: 'white', cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faUser} /> {isLoggedIn ? '로그아웃' : '로그인'}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
