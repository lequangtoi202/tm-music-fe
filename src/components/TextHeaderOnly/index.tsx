import { Container, StyledTextHeader } from './styles';
import { TextHeaderProps } from './types';

const TextHeaderOnly: React.FC<TextHeaderProps> = ({ text }) => {
  return (
    <Container>
      <StyledTextHeader>{text}</StyledTextHeader>
    </Container>
  );
};

export { TextHeaderOnly };
