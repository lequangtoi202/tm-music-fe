import React from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { UtilsFunction } from '../../utils';

import styles from './SearchItem.module.scss';
import { SearchResult } from '../../model/SearchResult';

const cx = classNames.bind(styles);

interface SearchItemProps {
  data: SearchResult;
}

const SearchItem: React.FC<SearchItemProps> = ({ data }) => {
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  const { handleShowError, handleShowSuccess } = UtilsFunction();

  let content;

  switch (data.type) {
    case 'Danh mục':
      content = (
        <Link to={`/category/${data.id}`} className={cx('wrapper')}>
          <div className={cx('info')}>
            <div className={cx('name')}>{data.name}</div>
            <div className={cx('type')}>{data.type}</div>
          </div>
        </Link>
      );
      break;
    case 'Tag':
      content = (
        <Link to={`/tag/${data.id}`} className={cx('wrapper')}>
          <div className={cx('info')}>
            <div className={cx('name')}>{data.name}</div>
            <div className={cx('type')}>{data.type}</div>
          </div>
        </Link>
      );
      break;
    case 'Bài viết':
      content = (
        <Link to={`/article/${data.id}`} className={cx('wrapper')}>
          <div className={cx('info')}>
            <div className={cx('name')}>{data.name}</div>
            <div className={cx('type')}>{data.type}</div>
          </div>
        </Link>
      );
      break;
  }
  return <div className={cx('add-account-wrapper')}>{content}</div>;
};

export default SearchItem;
