import React, { useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faN } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.style.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isSignUp, setIsSignUp] = useState(false)
  const SECRET_KEY = 'secret-key';

  const handleSignUp= (e) => {
    e.preventDefault();
    const savedUserName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("email");

    if (userName === savedUserName) {
      alert("이미 사용 중인 아이디입니다. 다른 이름을 입력해주세요.");
      return;
    }
    if (email === savedEmail) {
      alert("이미 사용 중인 이메일 주소입니다. 다른 이메일을 입력해주세요.");
      return;
    }
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      setPasswordCheck('');
      return;
    }

    localStorage.setItem("userName", userName);
    localStorage.setItem("email", email);
    localStorage.setItem('password', CryptoJS.AES.encrypt(password, SECRET_KEY).toString());
    alert(`🎉 ${userName}님, MentorMe의 회원이 되신 것을 축하드립니다.`);

    setIsSignUp(false);
    setUserName('');
    setEmail('');
    setPassword('');
    setPasswordCheck('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const savedEmail = localStorage.getItem("email");
    const encryptedPassword = localStorage.getItem("password")
    const savedUserName = localStorage.getItem("userName");
    if (!encryptedPassword) {
      alert("이메일 또는 비밀번호가 다릅니다.");
      setEmail('');
      setPassword('');
      return;
    }
    const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY).toString(CryptoJS.enc.Utf8);

    if (email === savedEmail && password === decryptedPassword) {
      localStorage.setItem("isLoggedIn", "true");
      alert(`🎉 ${savedUserName}님, 환영합니다.`);
    } else {
      alert("이메일 또는 비밀번호가 다릅니다.");
    }

    setEmail('');
    setPassword('');    
  };

  return (
    <Container style={{ 
      maxWidth: '400px', 
      height: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',      
      }}>
      {!isSignUp ? (
        <>
      <h2>로그인</h2>
      <Form onSubmit={handleLogin}>
          <FloatingLabel controlId="floatingEmail" label="이메일" className="mb-3">
            <Form.Control
              type="email" 
              placeholder="이메일"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="비밀번호" className="mb-3">
          <Form.Control
            type="password" 
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </FloatingLabel>
        <Button variant="outline-primary" size="lg" type="submit" className="w-100">
          로그인
        </Button>
      </Form>
      <div className="or-divider">OR</div>
      <div className="mt-3 text-center">        
        <Button variant="outline-danger" className="w-100 mb-3">
          <FontAwesomeIcon icon={faGoogle} /> 구글계정으로 로그인
        </Button>
        <Button variant="outline-success" className="w-100">
          <FontAwesomeIcon icon={faN} /> 네이버계정으로 로그인
        </Button>
      </div>
      <div className="mt-3 text-center">        
        <Button variant="outline-primary" size="lg" className="mb-3" onClick={() => setIsSignUp(true)}>
          회원가입
        </Button>
      </div>
        </>
      ) : (
        <>
          <h2>회원가입</h2>
          <Form onSubmit={handleSignUp}>
            <FloatingLabel controlId="floatingId" 
            label={<><span>아이디</span><span className="required-star">*</span></> } className="mb-3">
              <Form.Control
                type="text" 
                placeholder="아이디"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingEmail" 
            label={<><span>이메일</span><span className="required-star">*</span></> } className="mb-3">
              <Form.Control
                type="email" 
                placeholder="이메일"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" 
            label={<><span>비밀번호</span><span className="required-star">*</span></> } className="mb-3">
              <Form.Control
                type="password" 
                placeholder="비밀번호"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPasswordCheck" 
            label={<><span>비밀번호 재확인</span><span className="required-star">*</span></> } className="mb-3">
              <Form.Control
                type="password" 
                placeholder="비밀번호 재확인"
                value={passwordCheck}
                onChange={e => setPasswordCheck(e.target.value)}
                required
              />
            </FloatingLabel>
            <Button variant="outline-primary" size="lg" type="submit" className="w-100 mt-3 mb-4">
              가입하기
            </Button>
          </Form>
          <Button variant="outline-secondary" onClick={() => setIsSignUp(false)}>
            로그인 화면으로
          </Button>
        </>
      )}
    </Container>
  )
}

export default Login