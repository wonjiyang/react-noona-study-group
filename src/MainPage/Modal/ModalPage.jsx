// src/components/Modal/ModalPage.jsx
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalPage = ({
  show,
  handleClose,
  level,
  subject,
  setLevel,
  setSubject,
  submitQuestion,
}) => {
  const levelHandler = (e) => setLevel(e.target.dataset.level);
  const subjectHandler = (e) => setSubject(e.target.dataset.subject);

  const selectThemeLevel = () => {
    submitQuestion(`난이도는 ${level}, 테마는 ${subject}로 면접 질문주세요`);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>테마 및 난이도 설정하기</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h3>난이도</h3>
        <p className="d-flex align-items-center gap-2">
          {" "}
          {["상", "중", "하"].map((lv) => (
            <span
              key={lv}
              style={{
                border: level === lv ? "2px solid blue" : "none",
                padding: "6px",
                cursor: "pointer",
              }}
              data-level={lv}
              onClick={levelHandler}
            >
              {lv}
            </span>
          ))}
        </p>
        <h3>테마</h3>
        <p className="d-flex align-items-center gap-2">
          {" "}
          {["HTML", "CSS", "JAVASCRIPT", "REACT"].map((sub) => (
            <span
              key={sub}
              style={{
                border: subject === sub ? "2px solid blue" : "none",
                padding: "6px",
                cursor: "pointer",
              }}
              data-subject={sub}
              onClick={subjectHandler}
            >
              {sub}
            </span>
          ))}
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={selectThemeLevel}>
          전송
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPage;
