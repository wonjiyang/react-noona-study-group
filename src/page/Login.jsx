import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Container style={{ 
      maxWidth: '400px', 
      height: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      
      }}>
      <h2 style={{textAlign: 'center', fontWeight: '700' }}>로그인</h2>
      <div className="mt-3 text-center">        
        <Button variant="outline-dark" className="w-100">
          <FontAwesomeIcon icon={faGoogle} /> 구글계정으로 로그인
        </Button>
        <div style={{marginTop: '15px'}}>OR</div>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="이메일"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="secondary" type="submit" className="w-100">
          로그인
        </Button>
      </Form>
    </Container>
  )
}

export default Login