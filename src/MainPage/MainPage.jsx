import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faRobot } from '@fortawesome/free-solid-svg-icons';
import { Container, Button, Spinner } from 'react-bootstrap';
import './Mainpage.style.css';
import useChatbot from '../hooks/useChatbot';
import ModalPage from './Modal/ModalPage';

const MainPage = () => {
  // 예)임의 할당량
  const quota = 3;
  const [quo, setQuo] = useState(1);
  //   텍스트
  const [inputText, setInputText] = useState('');
  //  자동 스크롤 및 부모 스크롤 고정
  const chatBoxRef = useRef(null);

  // 모달창 설정
  const [showModal, setShowModal] = useState(false);
  //   달성률 메시지, 메시지 모달
  const [msg, setMsg] = useState('');

  //   hooks로 api로직 분리
  const {
    answers,
    setChat,
    setQuestion,
    chat,
    loading,
    level,
    setLevel,
    subject,
    setSubject,
    submitQuestion,
  } = useChatbot();
  const buttonText = [
    '빠른 질문받기',
    '힌트받기',
    '포기하기',
    '처음부터 다시시작',
  ];

  //   일일할당량 게이지
  let answerGraph = chat
    .filter(
      (el) =>
        el.content.includes('정답') &&
        el.content.includes('답변') &&
        !el.content.includes('오답')
    )
    .filter((el) => el.role === 'ai');

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat, loading]);
  useEffect(() => {
    console.log(answers);
  }, [answers]);

  // 일일할당량별 메시지
  useEffect(() => {
    const percent = Math.floor((answerGraph.length / quota) * 100);
    if (percent >= 100) {
      setMsg('100% 달성! 축하드려요');
    } else if (percent >= 80) {
      setMsg('이제 얼마 남지 않았어요 조금만 더!');
    } else if (percent >= 50) {
      setMsg('이제 절반 넘었어요!! 화이팅~');
    } else if (percent >= 20) {
      setMsg('아직 갈길이 멀어요! 좀 더 힘내보아요');
    } else {
      setMsg('이제 시작해보자!');
    }
  }, [answerGraph.length]);

  const assistButtonHandler = (text) => {
    // 힌트 ,포기, 질문 클릭시
    if (
      text.includes('힌트') ||
      text.includes('포기') ||
      text.includes('질문')
    ) {
      submitQuestion(text);
      return;
    }

    //"다시시작" 클릭시
    if (text.includes('다시시작')) {
      if (window.confirm(`정말로 다시시작 하시겠습니까?`)) {
        setQuestion(text);
        setChat([]);
      }
    }
  };

  const handleSubmit = () => {
    if (!inputText.trim()) return;
    submitQuestion(inputText);
    setInputText('');
  };
  return (
    <Container>
      {/* 컨테이너 */}
      <div
        className="chat-box"
        style={{
          width: '47vw',
          margin: '90px auto',
        }}
      >
        {/* 일일 할당량, 그래프 박스 */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#fff',
            padding: '10px',
            borderRadius: '20px',
          }}
        >
          <div
            className="d-flex justify-content-between align-items-center"
            style={{
              width: '90%',
              margin: 'auto',
            }}
          >
            <p style={{ fontSize: '15px', fontWeight: 'bold' }}>
              오늘 할당량 목표
            </p>
            <p>{Math.floor((answerGraph.length * 100) / quota)}%</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div
              style={{
                height: '10px',
                width: '90%',
                margin: '10px auto',
                backgroundColor: '#E8E8E8',
                borderRadius: '20px',
              }}
            >
              <div
                className="bg-primary"
                style={{
                  height: '100%',
                  width: answerGraph.length * (100 / quota) + '%',
                  borderRadius: '20px',
                  position: 'relative',
                }}
              ></div>
            </div>
          </div>
          <div
            className="d-flex justify-content-between align-items-center flex-wrap"
            style={{
              width: '90%',
              margin: '10px auto',
              color: '#989898',
              fontWeight: 'bold',
            }}
          >
            <p style={{ fontSize: '10px' }}>목표 다시 설정하기 &gt;</p>
            <p style={{ fontSize: '12px' }}>{msg}</p>
          </div>
        </div>
        {/* 박스 */}

        <div
          style={{
            width: '100%',
            margin: '30px 0',
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '20px',
          }}
        >
          {/* 챗봇 박스 */}
          <div
            ref={chatBoxRef}
            style={{
              width: '90%',
              height: '350px',
              margin: 'auto',
              overflowY: 'scroll',
              padding: '20px',
            }}
            className="chat-scroll"
          >
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
              }}
            >
              <li
                style={{
                  position: 'relative',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  padding: '10px',
                  backgroundColor: '#ebebeb',
                  borderRadius: '15px',
                  width: '50%',
                }}
              >
                <p>안녕하세요 ai 면접관입니다.</p>
                <p>*이용 가이드*</p>
                <p>
                  1. 우측 하단 아이콘 버튼을 눌러 난이도와 테마를 설정해주세요.
                </p>
                <p>2. 모달창안에서 난이도와 테마를 입력하면 질문 시작</p>
                <p>3. 잘 모르겠으면 검색란 아래 힌트 버튼도 이용해보세요!</p>
                <p>4. 텍스트로 질문에 답변</p>
                <p>5. 정답 시 할당량 그래프 증가!</p>
                <p>
                  6. 빨리 진행하고 싶다면 빠른 질문받기 버튼 (랜덤으로 질문
                  생성)
                </p>
                <div>
                  {' '}
                  <FontAwesomeIcon icon={faRobot} className="icon" />
                </div>
              </li>
              {chat.map((msg, i) => (
                <li
                  className="chat-text"
                  key={i}
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    padding: '8px',
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    width: '50%',
                    backgroundColor:
                      msg.role === 'user' ? '#0d6efd' : '#ebebeb',
                    borderRadius: '15px',
                    position: 'relative',
                  }}
                >
                  <p style={{ color: msg.role === 'ai' ? '#000' : '#fff' }}>
                    {msg.content}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      position: 'absolute',
                      bottom: msg.role === 'ai' ? '-40px' : '-30px',
                      left: msg.role === 'ai' && '-20px',
                      right: msg.role === 'user' && '-10px',
                    }}
                  >
                    {msg.role === 'ai' && (
                      <div
                        className="ai-icon"
                        style={{ position: 'static' }}
                      ></div>
                    )}
                    <p style={{ color: '#989898', fontSize: '10px' }}>
                      {msg.date}
                    </p>
                  </div>
                </li>
              ))}
              {loading && (
                <li>
                  {' '}
                  <Spinner animation="border" variant="primary" />
                </li>
              )}
            </ul>
          </div>

          {/* 텍스트 검색 입력 버튼 */}
          <div className="d-flex gap-2 justify-content-center flex-wrap my-2">
            <textarea
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              style={{
                height: '40px',
                borderRadius: '10px',
                fontSize: '14px',
                padding: '2px',
              }}
              value={inputText}
              className="w-75 border-primary"
            ></textarea>
            <Button variant="primary" size="lg" onClick={handleSubmit}>
              보내기
            </Button>
          </div>
          {/* 힌트, 포기, 다시하기 버튼 */}
          <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center my-2">
            {buttonText.map((text) => (
              <p
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#d9d9d9',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
                onClick={() => assistButtonHandler(text)}
              >
                {text}
              </p>
            ))}
            <p style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)}>
              <FontAwesomeIcon icon={faBook} size="2xl" />
            </p>
          </div>
        </div>
      </div>
      {/* 모달 생성 컴포넌트 */}
      {showModal && (
        <ModalPage
          show={showModal}
          handleClose={() => setShowModal(false)}
          level={level}
          subject={subject}
          setLevel={setLevel}
          setSubject={setSubject}
          submitQuestion={submitQuestion}
        />
      )}
    </Container>
  );
};

export default MainPage;
