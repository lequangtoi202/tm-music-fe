import { useState, forwardRef, HTMLProps, Ref } from 'react';
import styles from './Image.module.scss';
import classNames from 'classnames';
import images from '../../assets/images';

interface ImageProps extends HTMLProps<HTMLImageElement> {
  src?: string;
  alt?: string;
  fallBack?: string;
}

const Image = forwardRef((props: ImageProps, ref: Ref<HTMLImageElement>) => {
  const { src, alt, className, fallBack: customFallback = images.noImage, ...rest } = props;
  const [fallBack, setFallback] = useState<string | undefined>(undefined);

  const handleError = () => {
    setFallback(customFallback);
  };

  return (
    <img
      ref={ref}
      className={classNames(styles.wrapper, className)}
      src={fallBack || src}
      alt={alt}
      {...rest}
      onError={handleError}
    />
  );
});

export default Image;
