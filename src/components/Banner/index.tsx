import { Box } from '@mui/material';
import { StyledBanner } from './styles';
import { BannerProps } from './types';
import Image from '../Image';

const Banner: React.FC<BannerProps> = () => {
  return (
    <StyledBanner>
      <Box>
        <Image src={'https://avatar-nct.nixcdn.com/song/2024/04/25/c/e/f/d/1714038491705_300.jpg'} />
      </Box>
    </StyledBanner>
  );
};

export default Banner;
