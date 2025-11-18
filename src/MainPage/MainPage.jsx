import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";
import "./MainPage.style.css";
import useChatbot from "../hooks/useChatbot";
import ModalPage from "./Modal/ModalPage";

const MainPage = () => {
  // 예)임의 할당량
  const quota = 5;
  //   텍스트
  const [inputText, setInputText] = useState("");
  // 자동 스크롤
  const chatEndRef = useRef(null);
  // 모달창 설정
  const [showModal, setShowModal] = useState(false);
  //   달성률 메시지, 메시지 모달
  const [msg, setMsg] = useState("");
  const [showMsgModal, setShowMsgModal] = useState(false);
  //   hooks로 api로직 분리
  const {
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
    "모르겠어요... 힌트",
    "포기할게요...",
    "처음부터 다시시작",
  ];

  //   일일할당량 게이지
  let answerGraph = chat.filter((el) => el.content.includes("정답"));
  console.log(chat, answerGraph);
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, loading]);
  // 일일할당량별 메시지
  useEffect(() => {
    const percent = Math.floor((answerGraph.length / quota) * 100);
    if (percent >= 100) {
      setMsg("100% 달성! 축하드려요");
      setShowMsgModal(true);
    } else if (percent >= 80) {
      setMsg("이제 얼마 남지 않았어요 조금만 더!");
      setShowMsgModal(true);
    } else if (percent >= 50) {
      setMsg("이제 절반 왔어요!! 화이팅~");
      setShowMsgModal(true);
    } else if (percent >= 20) {
      setMsg("아직 갈길이 멀어요! 좀 더 힘내보아요");
      setShowMsgModal(true);
    } else {
      setMsg("");
      setShowMsgModal(false);
    }
  }, [answerGraph.length]);

  const assistButtonHandler = (text) => {
    // 힌트 클릭시
    if (text.includes("힌트")) {
      submitQuestion(text);
      return;
    }

    //"포기" 또는 "다시시작" 버튼 로직
    if (text.includes("포기") || text.includes("다시시작")) {
      if (
        window.confirm(
          `정말로 "${
            text.includes("포기") ? "포기" : "다시시작"
          }" 하시겠습니까?`
        )
      ) {
        setQuestion(text);
        setChat([]);
      }
    }
  };
  const handleSubmit = () => {
    if (!inputText.trim()) return;
    submitQuestion(inputText);
    setInputText("");
  };
  return (
    <>
      {/* 컨테이너 */}
      <Container
        className="d-flex justify-content-center align-items-center my-5"
        style={{ width: "80%" }}
      >
        {/* 박스 */}
        <div
          style={{
            width: "80%",
            border: "1px solid grey",
            borderRadius: "20px",
          }}
        >
          {/* 프로필, 할당량 그래프, 모달창 버튼 */}
          <div
            className="d-flex flex-column align-items-center gap-5"
            style={{ margin: "40px 0" }}
          >
            <div className="w-75 d-flex justify-content-between">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "lightgrey",
                  borderRadius: "50%",
                }}
              ></div>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowModal(true)}
              >
                난이도 및 테마 설정
              </Button>
            </div>
            <div className="d-flex align-items-center" style={{ width: "80%" }}>
              <div
                style={{
                  height: "20px",
                  width: "100%",
                  backgroundColor: "lightgrey",
                  borderRadius: "20px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: answerGraph.length * (100 / quota) + "%",
                    borderRadius: "20px",
                    backgroundColor: "gray",
                    position: "relative",
                  }}
                >
                  {showMsgModal && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-45px",
                        right: "-80px",
                        backgroundColor: "white",
                        fontSize: "10px",
                        padding: "6px",
                        borderRadius: "8px",
                        zIndex: "20",
                        border: "1px solid black",
                      }}
                    >
                      {msg}
                    </div>
                  )}
                  <div
                    style={{
                      position: "absolute",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: "-10px",
                      border: "2px solid black",
                      zIndex: "10",
                    }}
                  ></div>
                </div>
              </div>
              <p style={{ marginLeft: "20px" }}>
                {Math.floor((answerGraph.length * 100) / quota)}%
              </p>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              backgroundColor: "lightgrey",
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            {/* 챗봇 박스 */}
            <div
              style={{
                width: "80%",
                height: "320px",
                margin: "20px auto",
                overflowY: "scroll",
              }}
              className="chat-scroll"
            >
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <li
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "8px",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    width: "50%",
                  }}
                >
                  <p>안녕하세요 ai 면접관입니다.</p>
                  <p>*이용 가이드*</p>
                  <p>1. 난이도 및 테마 설정 버튼 클릭</p>
                  <p>2. 모달창안에서 난이도와 테마를 입력하면 질문 시작</p>
                  <p>3. 잘 모르겠으면 검색란 입 힌트 버튼도 이용해보세요!</p>
                </li>
                {chat.map((msg, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      padding: "8px",
                      alignSelf:
                        msg.role === "user" ? "flex-end" : "flex-start",
                      width: "50%",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      position: "relative",
                    }}
                  >
                    <p>{msg.content}</p>
                    <p
                      style={{
                        position: "absolute",
                        bottom: "-20px",
                        left: msg.role === "ai" && "0",
                        right: msg.role === "user" && "0",
                      }}
                    >
                      {msg.date.slice(0, 21)}
                    </p>
                  </li>
                ))}
                {loading && <li>질문 생성 중입니다...</li>}
                <div ref={chatEndRef} />
              </ul>
            </div>
            {/* 힌트, 포기, 다시하기 버튼 */}
            <div className="d-flex gap-3 align-items-center justify-content-center my-2">
              {buttonText.map((text) => (
                <p
                  style={{
                    cursor: "pointer",
                    backgroundColor: "white",
                    padding: "6px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                  onClick={() => assistButtonHandler(text)}
                >
                  {text}
                </p>
              ))}
            </div>
            {/* 텍스트 검색 입력 버튼 */}
            <div className="d-flex gap-2 justify-content-center">
              <textarea
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                value={inputText}
                className="w-75"
              ></textarea>
              <Button variant="secondary" size="lg" onClick={handleSubmit}>
                입력
              </Button>
            </div>
          </div>
        </div>
      </Container>
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
    </>
  );
};

export default MainPage;
