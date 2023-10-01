import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './MediaCard.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const cx = classNames.bind(styles);
const limitContent: React.CSSProperties = {
  maxHeight: '3em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '3',
  WebkitBoxOrient: 'vertical',
};
export default function MediaCard({ article, className }: any) {
  return (
    <div className={className}>
      <Card sx={{ maxWidth: 220 }}>
        <Link to={`/article/${article?.id}`} className={cx('title-link')}>
          <CardMedia className={cx('article-image')} sx={{ height: 140 }} image={article?.image} title="green iguana" />
        </Link>
        <CardContent className={cx('card-content')}>
          <Typography gutterBottom variant="h5" className={cx('title')} component="div">
            <div className={cx('meta-item')}>
              <div className={cx('meta-categories')}>
                <Link to={`/category/${article?.category.id}`}>{article?.category.name}</Link>
              </div>
              <div className={cx('meta-date')}>
                <span>
                  <i className="far fa-calendar-alt"></i>
                  {format(new Date(article?.createdAt), 'dd/MM/yyyy')}
                </span>
              </div>
            </div>
          </Typography>
          <Typography gutterBottom variant="h5" className={cx('title')} component="div">
            <Link to={`/article/${article?.id}`} className={cx('title-link')}>
              {article?.title}
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary" style={limitContent}>
            {article?.content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
