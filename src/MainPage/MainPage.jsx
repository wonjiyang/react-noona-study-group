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
  const [quota, setQuota] = useState(0);
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
    setVersion,
    version,
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

  const buttonText = ['빠른질문', '힌트', '포기', '다시시작'];
  console.log(chat);
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

  // 일일할당량별 메시지
  useEffect(() => {
    const percent = Math.floor((answerGraph.length / Number(quota)) * 100);
    if (percent >= 100) {
      setMsg('100% 달성! 축하드려요');
      if (window.confirm('100% 달성! 축하드려요 다시 시작하시겠습니까?')) {
        setQuota(0);
        setChat([]);
      }
    } else if (percent >= 80) {
      setMsg('이제 얼마 남지 않았어요 조금만 더!');
    } else if (percent >= 50) {
      setMsg('이제 절반 넘었어요!! 화이팅~');
    } else if (percent >= 20) {
      setMsg('아직 갈길이 멀어요! 좀 더 힘내보아요');
    } else {
      setMsg('이제 시작해보자!');
    }
  }, [answerGraph.length, quota]);

  const assistButtonHandler = (text) => {
    if (quota <= 0) {
      alert('먼저 일일 할당량 먼저 선택해주세요');
      return;
    }
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
    <div className="main-container">
      {/* 컨테이너 */}
      <div className="chat-box">
        {/* 일일 할당량, 그래프 박스 */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#fff',
            padding: '10px',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            className="d-flex justify-content-between align-items-center"
            style={{
              width: '94%',
              margin: 'auto',
            }}
          >
            <p style={{ fontSize: '15px', fontWeight: 'bold' }}>
              오늘 할당량 목표
            </p>
            <p>
              {quota === 0
                ? 0
                : Math.min(
                    Math.floor((answerGraph.length * 100) / Number(quota)),
                    100
                  )}
              %
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div
              style={{
                height: '10px',
                width: '94%',
                margin: '8px auto',
                backgroundColor: '#E8E8E8',
                borderRadius: '15px',
              }}
            >
              <div
                className="bg-primary"
                style={{
                  height: '100%',
                  width:
                    quota > 0
                      ? Math.min(
                          Math.floor(
                            (answerGraph.length * 100) / Number(quota)
                          ),
                          100
                        ) + '%'
                      : '0%',
                  borderRadius: '20px',
                }}
              ></div>
            </div>
          </div>
          <div
            className="d-flex justify-content-between align-items-center flex-wrap"
            style={{
              width: '94%',
              margin: '0 auto',
              color: '#989898',
              fontWeight: 'bold',
            }}
          >
            <p
              style={{ fontSize: '10px', cursor: 'pointer' }}
              onClick={() => setShowModal(true)}
            >
              목표 다시 설정하기 &gt;
            </p>
            <p style={{ fontSize: '12px', color: '#ff8818ff' }}>{msg}</p>
          </div>
        </div>
        {/* 박스 */}
        <div className=" chat-container">
          {/* 챗봇 박스 */}
          <div
            ref={chatBoxRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '0 20px',
              margin: 'auto',
            }}
            className="chat-scroll"
          >
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '6vh',
                fontSize: '0.8em',
              }}
            >
              <li
                style={{
                  position: 'relative',
                  padding: '1vh 4%',
                  backgroundColor: '#ebebeb',
                  borderRadius: '15px',
                  width: '70%',
                  wordBreak: 'keep-all',
                }}
              >
                <p>안녕하세요 ai 면접관입니다.</p>
                <p>
                  1. 우측 하단 아이콘 버튼을 눌러 난이도와 테마를 설정해주세요.
                </p>
                <p>2. 모달창안에서 난이도와 테마를 입력하면 질문 시작</p>
                <p>3. 잘 모르겠으면 검색란 아래 힌트 버튼도 이용해보세요!</p>
                <p>4. 텍스트로 질문에 답변</p>
                <p>5. 정답 시 할당량 그래프 증가!</p>
                <p>
                  6. 빨리 진행하고 싶다면 빠른 질문받기 버튼 (랜덤 질문 생성)
                </p>
                <div className="ai-icon">
                  <FontAwesomeIcon icon={faRobot} className="icon" />
                </div>
              </li>
              {chat.map((msg, i) => (
                <li
                  className="chat-text"
                  key={i}
                  style={{
                    fontSize: '1em',
                    padding: ' 1vh 4%',
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    width: '50%',
                    backgroundColor:
                      msg.role === 'user' ? '#0d6efd' : '#ebebeb',
                    borderRadius: '15px',
                    position: 'relative',
                  }}
                >
                  <p
                    style={{
                      color: msg.role === 'ai' ? '#212529' : '#fff',
                      padding: '0 1%',
                    }}
                  >
                    {msg.content.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: '4px',
                      position: 'absolute',
                      bottom: msg.role === 'ai' ? '-40px' : '-20px',
                      left: msg.role === 'ai' && '-20px',
                      right: msg.role === 'user' && '0px',
                    }}
                  >
                    {msg.role === 'ai' && (
                      <div className="ai-icon" style={{ position: 'static' }}>
                        {' '}
                        <FontAwesomeIcon icon={faRobot} className="icon" />
                      </div>
                    )}
                    <p style={{ color: '#989898', fontSize: '10px' }}>
                      {new Date(msg.date).toLocaleString('ko-KR')}
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
          <div>
            {/* 텍스트 검색 입력 버튼 */}
            <div
              className="d-flex gap-2 justify-content-center flex-wrap my-2"
              style={{ height: '5vh' }}
            >
              <textarea
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                value={inputText}
                className="border-primary"
              ></textarea>
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                style={{
                  padding: ' 7px 14px',
                  borderRadius: '6px',
                  fontSize: '0.7em',
                }}
              >
                보내기
              </Button>
            </div>
            {/* 힌트, 포기, 다시하기 버튼 */}
            <div className="d-flex align-items-center justify-content-between m-2">
              <div className="d-flex mx-2 gap-2 ">
                {buttonText.map((text) => (
                  <p
                    style={{
                      cursor: 'pointer',
                      backgroundColor: '#ff8818ff',
                      color: 'white',
                      padding: ' 7px 14px',
                      borderRadius: '6px',
                      fontSize: '0.7em',
                      fontWeight: 'bold',
                      display: 'flex',
                    }}
                    onClick={() => assistButtonHandler(text)}
                  >
                    {text}
                  </p>
                ))}
              </div>
              <p
                style={{
                  cursor: 'pointer',
                  color: '#787878ff',
                  fontSize: '1.3em',
                  marginRight: '1%',
                }}
                onClick={() => setShowModal(true)}
              >
                <FontAwesomeIcon icon={faBook} />
              </p>
            </div>
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
          quota={quota}
          setQuota={setQuota}
          setLevel={setLevel}
          setSubject={setSubject}
          submitQuestion={submitQuestion}
          setVersion={setVersion}
        />
      )}
    </div>
  );
};

export default MainPage;
