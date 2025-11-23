// src/components/Modal/ModalPage.jsx
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalPage = ({
  show,
  handleClose,
  level,
  subject,
  setLevel,
  setSubject,
  submitQuestion,
  quota,
  setQuota,
  setVersion,
}) => {
  const subjectHandler = (e) => setSubject(e.target.dataset.subject);
  const geminiVersion = [
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-2.0-flash-lite',
    'gemini-2.0-flash',
  ];
  const selectThemeLevel = () => {
    if (quota <= 0) {
      alert('할당량을 지정해주세요.');
      return;
    } else if (!level || !subject) {
      alert('난이도 및 테마를 선택해주세요');
      return;
    }
    submitQuestion(`난이도는 ${level}, 테마는 ${subject}로 면접 질문주세요`);
    setLevel();
    setSubject();
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      style={{ padding: '0 2%' }}
    >
      <Modal.Header closeButton>
        <Modal.Title
          className="px-3"
          style={{ fontSize: '1.1em', fontWeight: 'bold' }}
        >
          어떤 유형의 문제를 낼까요?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="px-3" style={{ fontSize: '1em' }}>
          난이도를 선택해주세요
        </h5>
        <div
          className="d-flex align-items-center justify-content-between px-3 my-3"
          style={{ fontSize: '0.9em' }}
        >
          <Form.Check
            type="radio"
            id="default-radio"
            label="입문"
            value="하"
            checked={level === '하'}
            onChange={(e) => setLevel(e.target.value)}
          />
          <Form.Check
            type="radio"
            id="default-radio"
            label="중급"
            value="중"
            checked={level === '중'}
            onChange={(e) => setLevel(e.target.value)}
          />
          <Form.Check
            type="radio"
            id="default-radio"
            label="실전"
            value="상"
            checked={level === '상'}
            onChange={(e) => setLevel(e.target.value)}
            style={{ marginRight: '2%' }}
          />
        </div>
        <h5 className="px-3 pt-2" style={{ fontSize: '1em' }}>
          기술언어를 선택해주세요
        </h5>
        <div
          className="d-flex flex-wrap align-items-center justify-content-between px-3 my-2"
          style={{ fontSize: '0.8em' }}
        >
          {' '}
          {['HTML', 'CSS', 'JAVASCRIPT', 'REACT'].map((sub) => (
            <span
              key={sub}
              style={{
                border:
                  subject === sub ? '2px solid blue' : '1px solid lightgrey',
                padding: '6px',
                cursor: 'pointer',
                borderRadius: '3px',
              }}
              data-subject={sub}
              onClick={subjectHandler}
            >
              {sub}
            </span>
          ))}
        </div>
        <h5 className="px-3 pt-3" style={{ fontSize: '1em' }}>
          일일 할당량을 입력해주세요
        </h5>
        <div className="px-5">
          <Form.Control
            size="sm"
            value={quota}
            type="number"
            onChange={(e) => setQuota(Number(e.target.value))}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="px-4">
        <div className="d-flex w-100 justify-content-between">
          <Form.Select
            style={{ width: 200 }}
            size="sm"
            onChange={(e) => setVersion(e.target.value)}
          >
            {geminiVersion.map((val, i) => (
              <option key={i} value={val}>
                {val}
              </option>
            ))}
          </Form.Select>

          <Button
            variant="primary"
            onClick={selectThemeLevel}
            style={{ fontSize: '0.9em' }}
          >
            전송
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPage;
