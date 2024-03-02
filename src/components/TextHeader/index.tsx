import Text from '../Text';
import { Container, StyledTextHeader } from './styles';
import { TextHeaderProps } from './types';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const TextHeader: React.FC<TextHeaderProps> = ({ text }) => {
  return (
    <Container>
      <StyledTextHeader>{text}</StyledTextHeader>
      <Text color="black" style={{ marginLeft: '8px', fontSize: '18px', fontWeight: 'bold' }}>
        {'Tất cả'}
        <KeyboardArrowRightIcon />
      </Text>
    </Container>
  );
};

export { TextHeader };
