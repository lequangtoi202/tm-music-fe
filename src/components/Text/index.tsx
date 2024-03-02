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
  ({ theme }) => `
      display: inline-block;
      align-items: center;

      &.flexItem {
        display: inline-flex;
      }
      
      &.MuiText {

        &-black {
          color: ${theme.palette.common.black}
        }

        &-primary {
          color: ${theme.palette.primary.main}
        }
        
        &-secondary {
          color: ${theme.palette.secondary.main}
        }
        
        &-success {
          color: ${theme.palette.success.main}
        }
        
        &-warning {
          color: ${theme.palette.warning.main}
        }
              
        &-error {
          color: ${theme.palette.error.main}
        }
        
        &-info {
          color: ${theme.palette.info.main}
        }
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
