import axios from 'axios';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Image from '../Image/Image';
import styles from '../CommentBox/Comment.module.scss';
import { UtilsFunction } from '../../utils';
import { API_URL } from '../../constant';
import { User } from '../../model/User';

const cx = classNames.bind(styles);

type CommentImgProps = {
  userId: number;
};

function CommentImg({ userId }: CommentImgProps) {
  const [user, setUser] = useState<User | null>(null);
  const { handleShowError } = UtilsFunction();

  useEffect(() => {
    axios
      .get(`${API_URL}users/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => handleShowError('Đã có lỗi xảy ra!'));
  }, [userId]);

  return <Image src={user?.avatar} className={cx('comment-user')} />;
}

export default CommentImg;
