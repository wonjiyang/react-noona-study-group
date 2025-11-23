import { useState } from 'react';
import { ListGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useBookmarkStore } from '../../../../store/useBookmarkStore';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useFilteredItems } from '../../../../hooks/useFilter';

const BookmarkList = () => {
  const { bookmarks, deleteBookmark } = useBookmarkStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const filteredBookmarks = useFilteredItems(
    bookmarks,
    searchQuery,
    selectedLevel,
    selectedSubject
  );

  const handleDeleteBookMark = (bookmark) => deleteBookmark(bookmark);

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div>
      {/* 검색 + 필터 UI */}
      <div className="mb-2">
        <InputGroup
          className="mb-2 mt-2"
          style={{
            width: '90%',
            borderRadius: '20px',
            overflow: 'hidden',
            margin: 'auto',
            backgroundColor: '#e8e8e8',
          }}
        >
          <InputGroup.Text
            style={{
              backgroundColor: '#e8e8e8',
              border: 'none',
              color: '#b8b8b8',
              padding: '8px 12px',
              cursor: 'pointer',
            }}
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </InputGroup.Text>
          <FormControl
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{
              border: 'none',
              backgroundColor: '#e8e8e8',
              boxShadow: 'none',
              fontSize: '0.8em',
            }}
          />
        </InputGroup>

        <div
          className="d-flex justify-content-end gap-2"
          style={{ marginRight: '30px' }}
        >
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="form-select"
            style={{ width: '80px', fontSize: '0.7em' }}
          >
            <option value="">난이도</option>
            <option value="상">입문</option>
            <option value="중">중급</option>
            <option value="하">실전</option>
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="form-select"
            style={{ maxWidth: '120px', fontSize: '0.7em' }}
          >
            <option value="">기술언어</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JAVASCRIPT">JAVASCRIPT</option>
            <option value="REACT">REACT</option>
          </select>
        </div>
      </div>

      {/* 북마크 리스트 */}
      <ListGroup as="ul" style={{ padding: '0.5vh 4%' }}>
        {filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((bookmark) => (
            <BookmarkItem
              key={bookmark.id}
              bookmark={bookmark}
              handleDeleteBookMark={handleDeleteBookMark}
            />
          ))
        ) : (
          <ListGroup.Item
            className="border-0 rounded-0 border-bottom pb-2"
            as="li"
            style={{ textAlign: 'center', fontStyle: 'italic' }}
          >
            {!searchQuery
              ? '중요한 질문을 북마크에 저장하여 나만의 학습 목록을 만들어 보세요!'
              : '검색 조건에 맞는 북마크가 없습니다.'}
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default BookmarkList;
