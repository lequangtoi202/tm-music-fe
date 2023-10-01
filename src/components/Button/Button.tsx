import React, { ReactNode, MouseEvent } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps extends LinkProps {
  primary?: boolean;
  text?: boolean;
  disabled?: boolean;
  outline?: boolean;
  href?: string;
  small?: boolean;
  large?: boolean;
  rounded?: boolean;
  children: ReactNode;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

function Button({
  to,
  href,
  primary = false,
  text = false,
  disabled = false,
  outline = false,
  small = false,
  large = false,
  rounded = false,
  children,
  className,
  leftIcon,
  rightIcon,
  onClick,
  ...passProps
}: ButtonProps) {
  let Comp: React.ElementType = 'button';
  let props: ButtonProps = {
    onClick,
    ...passProps,
    children: undefined,
    to: to || '',
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  if (disabled) {
    const { onClick, ...rest } = props;
    props = rest;
  }

  const classes = cx('wrapper', {
    primary,
    outline,
    small,
    large,
    text,
    disabled,
    rounded,
    [className!]: className,
  });

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
