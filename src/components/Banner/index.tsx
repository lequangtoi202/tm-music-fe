import { Box } from '@mui/material';
import { StyledBanner } from './styles';
import { BannerProps } from './types';
import Image from '../Image';

const Banner: React.FC<BannerProps> = ({ item }) => {
  return (
    <StyledBanner>
      <Box>
        <Image src={item.src} />
      </Box>
    </StyledBanner>
  );
};

export default Banner;
