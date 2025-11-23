import React, { useState } from 'react';
import { Button, Container, FloatingLabel, Form, Modal } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginSignUp.style.css';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const SECRET_KEY = 'secret-key';
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalMessage.includes('환영합니다')) {
      navigate('/main-page');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUserName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('email');
    const encryptedPassword = localStorage.getItem('password');

    if (!encryptedPassword) {
      setModalMessage('이메일 또는 비밀번호가 다릅니다.');
      setShowModal(true);
      setEmail('');
      setPassword('');
      return;
    }
    const decryptedPassword = CryptoJS.AES.decrypt(
      encryptedPassword,
      SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (email === savedEmail && password === decryptedPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      setModalMessage(`🎉 ${savedUserName}님, 환영합니다.`);
      setShowModal(true);
      onLogin();
    } else {
      setModalMessage('이메일 또는 비밀번호가 다릅니다.');
      setShowModal(true);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Container
        fluid="md"
        style={{
          maxWidth: 'clamp(480px, 55vw, 768px)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      >
        <div className="white-background">
          <h2>로그인</h2>
          <Form onSubmit={handleLogin}>
            <FloatingLabel
              controlId="floatingEmail"
              label="이메일"
              className="mb-2"
              style={{ fontSize: '0.7em' }}
            >
              <Form.Control
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FloatingLabel>
            <div style={{ position: 'relative' }}>
              <FloatingLabel
                controlId="floatingPassword"
                label="비밀번호"
                className="mb-2"
                style={{ fontSize: '0.7em' }}
              >
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingRight: '2.5rem' }}
                />
              </FloatingLabel>
              <div
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0.75rem',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  size="lg"
                />
              </div>
            </div>
            <Button
              variant="outline-primary"
              size="lg"
              type="submit"
              className="w-100 mt-2"
              style={{ fontSize: '0.8em' }}
            >
              로그인
            </Button>
          </Form>
          <div className="mt-1 text-center">
            <Button
              variant="outline-secondary"
              size="lg"
              className="mb-2 w-100"
              onClick={() => navigate('/signup')}
              style={{ fontSize: '0.8em' }}
            >
              회원가입
            </Button>
          </div>
        </div>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header
          closeButton
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Modal.Title style={{ textAlign: 'center' }}>
            <FontAwesomeIcon icon={faTriangleExclamation} />
            알림
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {modalMessage}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary" onClick={handleCloseModal}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
