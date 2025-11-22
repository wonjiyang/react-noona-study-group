import { useState } from 'react';
import { Button, ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import { useQuestionStore } from '../../../../store/useQuestionStore';
import { useBookmarkStore } from '../../../../store/useBookmarkStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBookmark as solidFaBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularFaBookmark } from '@fortawesome/free-regular-svg-icons';
import { useFilteredItems } from '../../../../hooks/useFilter';

const QuestionList = () => {
  const { questions, deleteQuestion } = useQuestionStore();

  const { bookmarks, addBookmark, deleteBookmark } = useBookmarkStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // 🔹 검색 실행 시 저장
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const filteredQuestions = useFilteredItems(questions, searchQuery, selectedLevel, selectedSubject);

  const handleAddBookmark = (question) => addBookmark(question);
  const handleDeleteBookmark = (questionId) => deleteBookmark(questionId);

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleDeleteQuestionAndBookmark = (id) => {
    deleteQuestion(id);
    deleteBookmark(id);
  };

  return (
    <div>
      {/* 검색 + 필터 UI */}
      <div className='mb-2'>
        <InputGroup
          className='mb-2 mt-2'
          style={{
            width: '90%',
            borderRadius: '20px',
            overflow: 'hidden',
            margin: 'auto',
          }}
        >
          <InputGroup.Text
            style={{
              backgroundColor: '#e8e8e8',
              border: 'none',
              borderRadius: 0,
              color: '#b8b8b8',
              padding: '8px 12px',
              cursor: 'pointer',
            }}
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </InputGroup.Text>
          <FormControl
            placeholder='검색어를 입력하세요'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{
              border: 'none',
              borderRadius: 0,
              backgroundColor: '#e8e8e8',
              boxShadow: 'none',
              fontSize: '0.8em',
              color: '#000',
            }}
          />
        </InputGroup>

        <div className='d-flex justify-content-end gap-2' style={{ marginRight: '30px' }}>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className='form-select'
            style={{ width: '100px', fontSize: '0.7em' }}
          >
            <option value=''>난이도</option>
            <option value='easy'>입문</option>
            <option value='medium'>중급</option>
            <option value='hard'>실전</option>
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className='form-select'
            style={{ width: '100px', fontSize: '0.7em' }}
          >
            <option value=''>기술언어</option>
            <option value='html'>HTML</option>
            <option value='css'>CSS</option>
            <option value='javascript'>JavaScript</option>
            <option value='react'>React</option>
          </select>
        </div>
      </div>

      {/* 리스트 */}
      <ListGroup as='ul' style={{ padding: '1.5vh 4%' }}>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => {
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
                      onClick={() => handleDeleteQuestionAndBookmark(question.id)}
                    >
                      삭제하기
                    </Button>
                    {isBookmarked ? (
                      <Button
                        className='border-0 bg-transparent d-block p-0 ms-auto'
                        variant='primary'
                        onClick={() => handleDeleteBookmark(question.id)}
                      >
                        <FontAwesomeIcon className='text-primary' icon={solidFaBookmark} />
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
          <ListGroup.Item
            className='border-0 rounded-0 border-bottom pb-2'
            as='li'
            style={{ textAlign: 'center', fontStyle: 'italic' }}
          >
            {!searchQuery ? '챗봇과 대화하고 질문 기록을 만들어 보세요!' : '검색 조건에 맞는 질문이 없습니다.'}
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default QuestionList;
