import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../constant';
import { TagModel } from '../../model/TagModel';
import { UtilsFunction } from '../../utils';
import classNames from 'classnames/bind';
import styles from './Tag.module.scss';
import { Link } from 'react-router-dom';

type TagProps = {
  articleId: number;
};

const cx = classNames.bind(styles);
function Tag({ articleId }: TagProps) {
  const [tags, setTags] = useState<TagModel[]>([]);
  const { handleShowError } = UtilsFunction();
  useEffect(() => {
    axios
      .get(API_URL + `articles/${articleId}/tags`)
      .then((res) => setTags(res.data))
      .catch((err) => handleShowError(err.response.data));
  }, [articleId]);
  return (
    <div className={cx('tags-container')}>
      {tags.map((tag) => (
        <span key={tag.id} className={cx('tag')}>
          <Link to={`/tag/${tag.id}`}>#{tag.name}</Link>
        </span>
      ))}
    </div>
  );
}

export default Tag;
