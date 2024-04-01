import HeadphonesIcon from '@mui/icons-material/Headphones';
import { Skeleton } from '@mui/material';
import { AlbumTitle, PlaylistItem, SongTitle, StyledBox, StyledBoxTitle, Time } from '../AlbumDetail/styles';

const PlaylistItemSkeleton = () => {
  return (
    <PlaylistItem>
      <SongTitle>
        <HeadphonesIcon style={{ marginRight: '8px' }} />
        <StyledBox>
          <StyledBoxTitle>
            <Skeleton variant="text" width={300} animation="wave" />
          </StyledBoxTitle>
          <StyledBoxTitle style={{ fontSize: 14, fontWeight: 'normal' }}>
            <Skeleton
              variant="text"
              width={'100%'}
              animation="wave"
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            />
          </StyledBoxTitle>
        </StyledBox>
      </SongTitle>
      <AlbumTitle>
        <Skeleton variant="text" width={200} animation="wave" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
      </AlbumTitle>
      <Time>
        <Skeleton variant="text" width={50} animation="wave" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
      </Time>
    </PlaylistItem>
  );
};

const RoundedSkeleton = () => <Skeleton variant="rounded" width="100%" height="100%" animation="wave" />;
const TitleSkeleton = () => <Skeleton variant="rounded" sx={{ mt: 1 }} width="100%" animation="wave" />;
const RectangularSkeleton = () => <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />;

export { PlaylistItemSkeleton, RectangularSkeleton, RoundedSkeleton, TitleSkeleton };
