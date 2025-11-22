<Navbar bg="primary" className="navbar" variant="dark">
  <Container>
    <Navbar.Brand
      as={Link}
      to={isLoggedIn ? '/main-page' : '/'}
      className="navbar-brand"
    >
      mentorMe
    </Navbar.Brand>

    <Nav className="navbar-nav">
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/my/bookmarks"
          className="nav-link"
          style={{ color: 'white' }}
        >
          <FontAwesomeIcon icon={faBookmark} /> 북마크
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as="span"
          onClick={isLoggedIn ? handleLogoutClick : () => navigate('/login')}
          style={{ color: 'white', cursor: 'pointer' }}
        >
          <FontAwesomeIcon icon={faUser} /> {isLoggedIn ? '로그아웃' : '로그인'}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  </Container>
</Navbar>;
