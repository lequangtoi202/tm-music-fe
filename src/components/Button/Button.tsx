import { StyledButton } from './styles';
import { TButtonProps } from './types';

export const TButton: React.FC<TButtonProps> = (props) => {
  const buttonStyle = {
    ...props.style,
  };

  return (
    <StyledButton {...props} style={buttonStyle}>
      {props.title}
    </StyledButton>
  );
};
