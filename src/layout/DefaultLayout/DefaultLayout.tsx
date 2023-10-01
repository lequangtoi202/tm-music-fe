import classNames from 'classnames/bind';

import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);
const DefaultLayout = ({ children }: any) => {
  return (
    <div className={cx('wrapper')}>
      <Navbar />
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
