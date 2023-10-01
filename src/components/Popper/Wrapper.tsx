import classNames from 'classnames/bind';
import styles from './Popper.module.scss';
import { ReactNode } from 'react';

const cx = classNames.bind(styles);

interface WrapperProps {
  children?: ReactNode;
  className?: string;
}

function Wrapper({ children, className }: WrapperProps) {
  return <div className={cx('wrapper', className)}>{children}</div>;
}

export default Wrapper;
