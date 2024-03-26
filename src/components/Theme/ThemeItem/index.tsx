import { PlayCircleOutline, FavoriteBorder, MoreHoriz } from '@mui/icons-material';
import Image from '../../Image';
import { RoundedSkeleton } from '../../Skeleton';
import { StyledWrapper, StyledLayerHover, StyledThemeItem } from '../styles';
import { ThemeItemProps } from '../types';
import { Box } from '@mui/material';

const ThemeItem: React.FC<ThemeItemProps> = ({ item, loading }) => {
  return (
    <StyledThemeItem>
      {loading ? (
        <RoundedSkeleton />
      ) : (
        <StyledWrapper>
          <StyledLayerHover>
            <Box>
              <FavoriteBorder />
              <PlayCircleOutline />
              <MoreHoriz />
            </Box>
          </StyledLayerHover>
          <Image src={item.src}></Image>
        </StyledWrapper>
      )}
    </StyledThemeItem>
  );
};

export default ThemeItem;
