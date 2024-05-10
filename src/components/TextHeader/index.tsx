import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Text from '../Text';
import { Container, StyledTextHeader, StyledViewMore } from './styles';
import { TextHeaderProps } from './types';
import { Link } from 'react-router-dom';

const TextHeader: React.FC<TextHeaderProps> = ({ text }) => {
  return (
    <Container>
      <StyledTextHeader>{text}</StyledTextHeader>
      <StyledViewMore>
        <Link to='/chu-de'>
          <Text>{'TẤT CẢ'}</Text>
        </Link>
        
        <KeyboardArrowRightIcon sx={{ fontSize: 32 }} />
      </StyledViewMore>
    </Container>
  );
};

export { TextHeader };
