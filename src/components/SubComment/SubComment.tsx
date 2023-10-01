import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import styles from './SubComment.module.scss';
import CommentImg from '../CommentImg/CommentImg';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useUser } from '../../hook';
import { API_URL } from '../../constant';
import { deleteComment } from '../../redux/commentReducer';
import { UtilsFunction } from '../../utils';
import { Article } from '../../model/Article';
import Cookies from 'universal-cookie/es6';
import { CommentModel } from '../../model/CommentModel';

const cx = classNames.bind(styles);
type SubCommentProps = {
  subComment: CommentModel;
  article: Article;
  onReply: (commentId: number) => void;
};
function SubComment({ subComment, article, onReply }: SubCommentProps) {
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const { handleShowError, handleShowSuccess } = UtilsFunction();

  const handleDeleteComment = (commentId: number) => {
    axios
      .delete(API_URL + `articles/${article.id}/comments/${commentId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        dispatch(deleteComment(true));
        handleShowSuccess('Xóa comment thành công');
      })
      .catch((err) => {
        handleShowError('Lấy dữ liệu thất bại!');
      });
  };

  return (
    <div className={cx('sub-comment-info-wrap')}>
      <CommentImg userId={subComment.userId} />

      <div className={cx('comment-part')}>
        <div className={cx('comment')}>{subComment.content}</div>
        <div className={cx('comment-interactions-wrapper')}>
          <div className={cx('interactions-action')}>
            <span>Thích</span>
          </div>
          <div className={cx('comment-action')} onClick={() => onReply(subComment.parentId.id)}>
            <span>Phản hồi</span>
          </div>
          {currentUser && (
            <>
              {currentUser.id === subComment.userId || currentUser.id === article.authors.user.id ? (
                <div className={cx('comment-action')} onClick={() => handleDeleteComment(subComment.id)}>
                  <span>Xóa</span>
                </div>
              ) : null}
            </>
          )}
          {formatDistanceToNow(new Date(subComment.createdAt), {
            addSuffix: true,
            locale: vi,
          })}
        </div>
      </div>
    </div>
  );
}

export default SubComment;
