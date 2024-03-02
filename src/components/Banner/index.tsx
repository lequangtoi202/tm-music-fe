import { Box } from '@mui/material';
import { Container, StyledBanner } from './styles';
import { BannerProps } from './types';

const Banner: React.FC<BannerProps> = ({ item }) => {
  return (
    <Container>
      <StyledBanner>
        <Box>{item.title}</Box>
      </StyledBanner>
    </Container>
  );
};

export default Banner;
