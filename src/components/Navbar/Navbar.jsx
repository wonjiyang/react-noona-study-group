import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.style.css';

const CustomNavbar = () => {
  return (
    <Navbar bg="primary" className="navbar" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="navbar-brand">
          mentorMe
        </Navbar.Brand>
        <Nav className="navbar-nav">
          <Nav.Item>
            <Nav.Link href="#bookmark" className="nav-link">
              <FontAwesomeIcon icon={faBookmark} /> 북마크
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#login" className="nav-link">
              <FontAwesomeIcon icon={faUser} /> 로그인
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
