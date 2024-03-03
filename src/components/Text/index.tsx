// Text.tsx
import { styled } from '@mui/system';
import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface TextProps {
  className?: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info' | 'black';
  flex?: boolean; // Added fontWeight property
  children?: ReactNode;
  style?: React.CSSProperties;
}

const TextWrapper = styled('span')(
  () => `
      display: inline-block;
      align-items: center;
      font-size: 14px;

      &.flexItem {
        display: inline-flex;
      }

      @media (max-width: 1200px) {
        font-size: 14px;
      }
      
      @media (max-width: 480px) {
        font-size: 12px;
      }
`,
);

const Text: FC<TextProps> = ({ className, color = 'secondary', flex, style, children, ...rest }) => {
  return (
    <TextWrapper style={{ ...style }} className={clsx('MuiText-' + color, { flexItem: flex })} {...rest}>
      {children}
    </TextWrapper>
  );
};

export default Text;
