import React, { useState } from 'react';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.style.css';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const SECRET_KEY = 'secret-key';
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();  

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUserName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('email');
    const encryptedPassword = localStorage.getItem('password');
    
    if (!encryptedPassword) {
      alert('이메일 또는 비밀번호가 다릅니다.');
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
      alert(`🎉 ${savedUserName}님, 환영합니다.`);
      onLogin();
      navigate('/main-page');
    } else {
      alert('이메일 또는 비밀번호가 다릅니다.');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <Container
      style={{
        maxWidth: '400px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div className='white-background'>
        <h2>로그인</h2>
          <Form onSubmit={handleLogin}>
            <FloatingLabel
              controlId="floatingEmail"
              label="이메일"
              className="mb-3"
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
              className="mb-3"
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
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="lg" />
            </div>
            </div>
            <Button
              variant="outline-primary"
              size="lg"
              type="submit"
              className="w-100"
            >
              로그인
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <Button
              variant="outline-secondary"
              size="lg"
              className="mb-3 w-100"
              onClick={() => navigate('/signup')}
            >
              회원가입
            </Button>
          </div>
      </div>
          
    </Container>
  );
};

export default Login;