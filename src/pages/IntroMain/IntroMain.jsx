import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import './IntroMain.style.css';

const IntroMain = () => {
  const [messages, setMessages] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const navigate = useNavigate();

  const introMessages = [
    '안녕하세요! 저는 여러분의 면접 학습을 도와줄 AI멘토에요.\n이곳에서 다양한 면접 질문을 연습하며, 점차 실력을 키워나갈 수 있습니다.\n이제 사용 방법을 소개해드릴게요!',
    '먼저, 연습하고 싶은 면접의 난이도와 기술 언어를 선택해주세요.',
    '선택이 완료되면, 관련된 면접 질문을 드릴게요.',
    '질문에 맞는 답변을 생각해 입력해주세요.',
    '저는 여러분의 답변에 대해 평가 혹은 해설을 남길게요.',
    '도움이 필요하다면 ‘힌트’ 버튼을 눌러 힌트를 받아보거나,\n너무 어렵다면 ‘포기’ 버튼을 눌러 다음 질문으로 넘어갈 수 있어요.\n모든 질문들은 자동으로 기록되며, 저장 기능을 사용해 북마크할 수 있어요.',
    '이제 ‘시작하기’ 버튼을 눌러 면접 연습을 시작해 보세요!',
  ];

  useEffect(() => {
    if (msgIndex < introMessages.length) {
      if (charIndex < introMessages[msgIndex].length) {
        const timer = setTimeout(() => {
          setCurrentText((prev) => prev + introMessages[msgIndex][charIndex]);
          setCharIndex(charIndex + 1);
        }, 40);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setMessages((prev) => [...prev, currentText]);
          setCurrentText('');
          setMsgIndex(msgIndex + 1);
          setCharIndex(0);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [charIndex, msgIndex, currentText, introMessages]);

  useEffect(() => {
    const box = document.getElementById('scrollBox');
    if (box) {
      box.scrollTop = box.scrollHeight;
    }
  }, [messages, currentText]);

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className="page">
      <div className="iconBox">
        <div className="chatIconContainer">
          <FontAwesomeIcon icon={faRobot} className="icon" />
        </div>
      </div>

      <div className="box" id="scrollBox">
        <div className="chatBubbleContainer">
          {messages.map((msg, idx) => (
            <div className="chatBubble" key={idx}>
              <p className="message">{msg}</p>
            </div>
          ))}

          {currentText && (
            <div className={`chatBubble ${msgIndex === 0 ? '' : 'newBubble'}`}>
              <p className={`message ${msgIndex === 0 ? '' : 'newMessage'}`}>
                {currentText}
              </p>
            </div>
          )}
        </div>

        {msgIndex === introMessages.length && currentText === '' && (
          <button onClick={handleStart} className="startButton">
            시작하기
          </button>
        )}
      </div>
    </div>
  );
};

export default IntroMain;
