// src/components/Modal/ModalPage.jsx
import React from "react";
import { Form } from "react-bootstrap";
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
  const subjectHandler = (e) => setSubject(e.target.dataset.subject);

  const selectThemeLevel = () => {
    submitQuestion(`난이도는 ${level}, 테마는 ${subject}로 면접 질문주세요`);
    setLevel();
    setSubject();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>어떤 유형의 문제를 낼까요?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="px-5">난이도를 선택해주세요</h5>
        <div className="d-flex align-items-center justify-content-between px-5 my-3">
          <Form.Check
            type="radio"
            id="default-radio"
            label="입문"
            value="하"
            checked={level === "하"}
            onChange={(e) => setLevel(e.target.value)}
          />
          <Form.Check
            type="radio"
            id="default-radio"
            label="중급"
            value="중"
            checked={level === "중"}
            onChange={(e) => setLevel(e.target.value)}
          />
          <Form.Check
            type="radio"
            id="default-radio"
            label="실전"
            value="상"
            checked={level === "상"}
            onChange={(e) => setLevel(e.target.value)}
          />
        </div>
        <h5 className="px-5">기술언어를 선택해주세요</h5>
        <div className="d-flex flex-wrap align-items-center justify-content-between px-5">
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
        </div>
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
