import { StyledButton } from './styles';
import { TButtonProps } from './types';

export const TButton: React.FC<TButtonProps> = ({ loading, ...props }) => {
  const buttonStyle = {
    ...props.style,
  };

  return (
    <StyledButton {...props} loading={loading} style={buttonStyle}>
      {props.title}
    </StyledButton>
  );
};
