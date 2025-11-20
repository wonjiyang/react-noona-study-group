import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const BookmarkItem = ({ bookmark, handleDeleteBookMark }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <ListGroup.Item className='border-0 rounded-0 border-bottom pb-2' as='li' key={bookmark.id}>
      <div className='mb-3'>
        <span className='text-primary fw-bold'>Q.</span>
        <p className='ps-3 mb-0'>{bookmark.question}</p>
      </div>
      <div className='mb-3'>
        <span className='text-primary fw-bold'>A.</span>
        <p className='ps-3 mb-0'>{bookmark.expectedAnswer}</p>
      </div>
      {showExplanation && (
        <div className='mb-3'>
          <span className='text-primary fw-bold'>E.</span>
          <p className='ps-3 mb-0'>{bookmark.explanation}</p>
        </div>
      )}
      <div className='d-flex align-items-center'>
        <p className='ps-3 mb-0' style={{ color: '#BCBCBC', fontSize: '12px' }}>
          {bookmark.createdAt}
        </p>
        <div className='d-flex gap-3 ms-auto'>
          <Button
            className='p-0 ps-3 pe-3 rounded-pill'
            variant='primary'
            style={{ fontSize: '12px' }}
            onClick={() => setShowExplanation(!showExplanation)}
          >
            해설보기
          </Button>
          <Button
            className='border-0 bg-transparent d-block p-0'
            variant='primary'
            onClick={() => handleDeleteBookMark(bookmark.id)}
          >
            <FontAwesomeIcon className='text-primary ' icon={faBookmark} />
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default BookmarkItem;
