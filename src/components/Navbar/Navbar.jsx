import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.style.css';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  return (
    <Navbar bg="primary" className="navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          mentorMe
        </Navbar.Brand>
        <Nav className="navbar-nav">
          <Nav.Item>
            <Nav.Link as={Link} to="/my/bookmarks" className="nav-link">
              <FontAwesomeIcon icon={faBookmark} /> 북마크
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/login" className="nav-link">
              <FontAwesomeIcon icon={faUser} /> 로그인
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
