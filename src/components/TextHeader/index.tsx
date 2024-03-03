import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Text from '../Text';
import { Container, StyledTextHeader, StyledViewMore } from './styles';
import { TextHeaderProps } from './types';

const TextHeader: React.FC<TextHeaderProps> = ({ text }) => {
  return (
    <Container>
      <StyledTextHeader>{text}</StyledTextHeader>
      <StyledViewMore>
        <Text>{'TẤT CẢ'}</Text>
        <KeyboardArrowRightIcon sx={{ fontSize: 32 }} />
      </StyledViewMore>
    </Container>
  );
};

export { TextHeader };
