import { Button, ListGroup } from 'react-bootstrap';
import { useQuestionStore } from '../../../../store/useQuestionStore';
import { useBookmarkStore } from '../../../../store/useBookmarkStore';
import { faBookmark as solidFaBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularFaBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuestionList = () => {
  const { questions, deleteQuestion } = useQuestionStore();

  const { bookmarks, addBookmark, deleteBookmark } = useBookmarkStore();

  const handleAddBookmark = (question) => {
    addBookmark(question);
  };

  const handleDeleteBookmark = (question) => {
    deleteBookmark(question);
  };

  return (
    <ListGroup as='ul' style={{ padding: '8px 16px' }}>
      {questions.length ? (
        questions.map((question) => {
          const isBookmarked = bookmarks.some((bookmark) => bookmark.id === question.id);

          return (
            <ListGroup.Item className='border-0 rounded-0 border-bottom pb-2' as='li' key={question.id}>
              <div className='mb-3'>
                <span className='text-primary fw-bold'>Q.</span>
                <p className='ps-3'>{question.question}</p>
              </div>
              <div className='d-flex align-items-center'>
                <p className='ps-3 mb-0' style={{ color: '#BCBCBC', fontSize: '12px' }}>
                  {question.date}
                </p>
                <div className='d-flex gap-3 ms-auto'>
                  <Button
                    className='p-0 ps-3 pe-3 rounded-pill'
                    variant='primary'
                    style={{ fontSize: '12px' }}
                    onClick={() => deleteQuestion(question.id)}
                  >
                    삭제하기
                  </Button>
                  {isBookmarked ? (
                    <Button
                      className='border-0 bg-transparent d-block p-0 ms-auto'
                      variant='primary'
                      onClick={() => handleDeleteBookmark(question.id)}
                    >
                      <FontAwesomeIcon className='text-primary ' icon={solidFaBookmark} />
                    </Button>
                  ) : (
                    <Button
                      className='border-0 bg-transparent d-block p-0 ms-auto'
                      variant='primary'
                      onClick={() => handleAddBookmark(question)}
                    >
                      <FontAwesomeIcon icon={regularFaBookmark} color='#5271EB' />
                    </Button>
                  )}
                </div>
              </div>
            </ListGroup.Item>
          );
        })
      ) : (
        <ListGroup.Item className='border-0 rounded-0 border-bottom pb-2' as='li'>
          면접 챗봇과 대화하고 질문 기록을 만들어 보세요!
        </ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default QuestionList;
