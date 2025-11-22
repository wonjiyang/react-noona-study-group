import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCheck, faEye, faEyeSlash, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js';
import { Button, Container, FloatingLabel, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.style.css';
import { useNavigate } from 'react-router';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const SECRET_KEY = 'secret-key';
  const [isMinLength, setIsMinLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasLower, setHasLower] = useState(false);
  const [hasUpper, setHasUpper] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const handleCloseModal = () => {
    setShowModal(false);
    if (modalMessage.includes('축하드립니다')) {
      navigate('/login');
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const Checkmark = () => (
    <span className='text-success' style={{ fontWeight: 'bold' }}>
      <FontAwesomeIcon icon={faCheck} />
    </span>
  );
  const Xmark = () => (
    <span className='text-danger' style={{ fontWeight: 'bold' }}>
      <FontAwesomeIcon icon={faXmark} />
    </span>
  );

  React.useEffect(() => {
    setIsMinLength(password.length >= 6);
    setHasNumber(/\d/.test(password));
    setHasLower(/[a-z]/.test(password));
    setHasUpper(/[A-Z]/.test(password));
    setHasSpecial(/[!@#$%^&*(),.?":{}|<>]/.test(password));
  }, [password]);

  const renderPasswordRules = () => {
    if (!showPasswordRules) return null;

    if (isPasswordValid) {
      return (
        <div className="valid-password-msg">
          <small>
            <FontAwesomeIcon icon={faCheck} /> 사용 가능한 비밀번호입니다.
          </small>            
        </div>
      );
    } else {
        return (
          <div className="password-rules-msg">
            <small>
              비밀번호는 다음을 유의해 만들어주세요.<br />
            </small>
            <small className={isMinLength ? 'text-success' : 'text-danger'}>
              {isMinLength ? <Checkmark /> : <Xmark />} 최소 6자리 이상
            </small><br />
            <small className={hasNumber ? 'text-success' : 'text-danger'}>
              {hasNumber ? <Checkmark /> : <Xmark />} 최소 1개의 숫자
            </small><br />
            <small className={hasLower ? 'text-success' : 'text-danger'}>
              {hasLower ? <Checkmark /> : <Xmark />} 최소 1개의 소문자
            </small><br />
            <small className={hasUpper ? 'text-success' : 'text-danger'}>
              {hasUpper ? <Checkmark /> : <Xmark />} 최소 1개의 대문자
            </small><br />
            <small className={hasSpecial ? 'text-success' : 'text-danger'}>
              {hasSpecial ? <Checkmark /> : <Xmark />} 최소 1개의 특수문자
            </small>
          </div>
        );
      }
    };

    const isPasswordValid =
      isMinLength && hasNumber && hasLower && hasUpper && hasSpecial;

    const handleSignUp = (e) => {
      e.preventDefault();

      // if (!isPasswordValid) {
      //   alert('비밀번호 규칙을 모두 충족해야 합니다.');
      //   return;
      // }
      if (!isPasswordValid) {
        setModalMessage('비밀번호 규칙을 모두 충족해야 합니다.');
        setShowModal(true);
        return;
      }
  
      const savedUserName = localStorage.getItem('userName');
      const savedEmail = localStorage.getItem('email');

      // if (userName === savedUserName) {
      //   alert('이미 사용 중인 아이디입니다. 다른 이름을 입력해주세요.');
      //   return;
      // }
      // if (email === savedEmail) {
      //   alert('이미 사용 중인 이메일 주소입니다. 다른 이메일을 입력해주세요.');
      //   return;
      // }
      // if (password !== passwordCheck) {
      //   alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      //   setPasswordCheck('');
      //   return;
      // }
      if (userName === savedUserName) {
        setModalMessage('이미 사용 중인 아이디입니다. 다른 이름을 입력해주세요.');
        setShowModal(true);
        return;
      }
      if (email === savedEmail) {
        setModalMessage('이미 사용 중인 이메일 주소입니다. 다른 이메일을 입력해주세요.');
        setShowModal(true);
        return;
      }
      if (password !== passwordCheck) {
        setModalMessage('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
        setShowModal(true);
        setPasswordCheck('');
        return;
      }

      localStorage.setItem('userName', userName);
      localStorage.setItem('email', email);
      localStorage.setItem(
        'password',
        CryptoJS.AES.encrypt(password, SECRET_KEY).toString()
      );
      // alert(`🎉 ${userName}님, MentorMe의 회원이 되신 것을 축하드립니다.`);
      setModalMessage(`🎉 ${userName}님, MentorMe의 회원이 되신 것을 축하드립니다.`);
      setShowModal(true);
      // navigate('/login');

      setUserName('');
      setEmail('');
      setPassword('');
      setPasswordCheck('');
    };
    const isFormValid =
      userName.trim() !== '' &&
      emailRegex.test(email) &&
      password.trim() !== '' &&
      passwordCheck.trim() !== '' &&
      isPasswordValid &&
      password === passwordCheck;

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
      <div className='white-background'>
        <h2>회원가입</h2>
          <Form onSubmit={handleSignUp}>
            <FloatingLabel
              controlId="floatingId"
              label={
                <>
                  <span>아이디</span>
                  <span className="required-star">*</span>
                </>
              }
              className="mb-3"
            >
            <Form.Control
              type="text"
              placeholder="아이디"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              pattern="\S+"
              required
            />
            </FloatingLabel>
              <div>
                {userName.length > 0 && /\s/.test(userName) && (
                  <div className="invalid-password-msg">
                    <small>
                      <FontAwesomeIcon icon={faXmark} /> 공백없이 입력해주세요.
                    </small>
                  </div>
                )}
              </div>
            <FloatingLabel
              controlId="floatingEmail"
              label={
                <>
                  <span>이메일</span>
                  <span className="required-star">*</span>
                </>
              }
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
              <div>
                {email.length > 0 && (
                  !emailRegex.test(email) ? (
                    <div className="invalid-password-msg">
                      <small>
                        <FontAwesomeIcon icon={faXmark} /> 이메일 형식에 맞춰 입력해주세요.
                      </small>
                    </div>
                  ) : null
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <FloatingLabel
                  controlId="floatingPassword"
                  label={
                    <>
                      <span>비밀번호</span>
                      <span className="required-star">*</span>
                    </>
                  }
                  className="mb-3"
                >
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setShowPasswordRules(true)}
                  required
                  style={{ paddingRight: '2.5rem' }}
                />
                  {renderPasswordRules()}
                </FloatingLabel>      
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye} size="lg"
                    />
                  </div>
              </div>
            <FloatingLabel
              controlId="floatingPasswordCheck"
                label={
                  <>
                    <span>비밀번호 재확인</span>
                    <span className="required-star">*</span>
                  </>
                }
                className="mb-3"
                style={{ position: 'relative' }}
            >
            <Form.Control
              type={showPasswordCheck ? 'text' : 'password'}
              placeholder="비밀번호 재확인"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              required
            />
              <div
                onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                className="password-toggle"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0.75rem',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
              >
                <FontAwesomeIcon icon={showPasswordCheck ? faEyeSlash : faEye} size="lg" />
              </div>
            </FloatingLabel>
              <div>
                {passwordCheck.length > 0 && (
                  password === passwordCheck ? (
                    <div className="valid-password-msg">
                      <small>
                        <FontAwesomeIcon icon={faCheck} /> 비밀번호가 일치합니다.
                      </small>                          
                    </div>
                  ) : (
                        <div className="invalid-password-msg">
                          <small>
                            <FontAwesomeIcon icon={faXmark} /> 비밀번호가 일치하지 않습니다.
                          </small>                          
                        </div>
                      )
                )}
              </div>
            <Button
              variant="outline-primary"
              size="lg"
              type="submit"
              className="w-100 mt-3 mb-3"
              disabled={!isFormValid}
            >
              가입하기
            </Button>
          </Form>
          <Button
            variant="outline-secondary"
            size="lg"
            className="w-100"
            onClick={() => navigate('/login')}
          >
            로그인 화면으로
          </Button>
      </div>
    </Container>
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton style={{ display: 'flex', justifyContent: 'center' }}>
        <Modal.Title style={{ textAlign: 'center' }}><FontAwesomeIcon icon={faTriangleExclamation} />알림</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
        {modalMessage}
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={handleCloseModal}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default SignUp