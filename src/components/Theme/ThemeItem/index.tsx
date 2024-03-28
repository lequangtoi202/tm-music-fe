import { FavoriteBorder, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import Image from '../../Image';
import { RoundedSkeleton } from '../../Skeleton';
import { StyledLayerHover, StyledThemeItem, StyledWrapper } from '../styles';
import { ThemeItemProps } from '../types';

const ThemeItem: React.FC<ThemeItemProps> = ({ item, loading }) => {
  return (
    <StyledThemeItem>
      {loading ? (
        <RoundedSkeleton />
      ) : (
        <StyledWrapper style={{ height: '80%' }}>
          <StyledLayerHover>
            <Tooltip placement="top" title="Yêu thích">
              <IconButton>
                <FavoriteBorder />
              </IconButton>
            </Tooltip>
            <Tooltip placement="top" title="Phát">
              <IconButton>
                <PlayCircleOutline />
              </IconButton>
            </Tooltip>
            <Tooltip placement="top" title="Khác">
              <IconButton>
                <MoreHoriz />
              </IconButton>
            </Tooltip>
          </StyledLayerHover>
          <Image src={item.src}></Image>
        </StyledWrapper>
      )}
    </StyledThemeItem>
  );
};

export default ThemeItem;
