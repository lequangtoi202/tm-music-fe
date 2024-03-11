import { Box } from '@mui/material';
import { StyledBanner } from './styles';
import { BannerProps } from './types';

const Banner: React.FC<BannerProps> = ({ item }) => {
  return (
    <StyledBanner>
      <Box>{item.title}</Box>
    </StyledBanner>
  );
};

export default Banner;
