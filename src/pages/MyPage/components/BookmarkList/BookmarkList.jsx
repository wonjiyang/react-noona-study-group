import { ListGroup } from 'react-bootstrap';
import { useBookmarkStore } from '../../../../store/useBookmarkStore';
import BookmarkItem from '../BookmarkItem/BookmarkItem';

const BookmarkList = () => {
  const { bookmarks, deleteBookmark } = useBookmarkStore();

  const handleDeleteBookMark = (id) => {
    deleteBookmark(id);
  };

  return (
    <ListGroup as='ul' style={{ padding: '8px 16px' }}>
      {bookmarks.length ? (
        bookmarks.map((bookmark) => {
          return <BookmarkItem key={bookmark.id} bookmark={bookmark} handleDeleteBookMark={handleDeleteBookMark} />;
        })
      ) : (
        <ListGroup.Item className='border-0 rounded-0 border-bottom pb-2' as='li'>
          중요한 질문을 북마크에 저장하여 나만의 학습 목록을 만들어 보세요!
        </ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default BookmarkList;
