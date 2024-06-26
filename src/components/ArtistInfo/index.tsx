import { PersonAddAlt } from '@mui/icons-material';
import { Box, Button, Skeleton } from '@mui/material';
import Image from '../Image';
import { StyleSkeleton, StyledArtistInfo, StyledArtistWrapper } from './styles';
import { ArtistInfoProps } from './types';
import { followArtist, unfollowArtist } from '../../services/user';
import { useContext } from 'react';
import { KContext } from '../../context';
import images from '../../assets/images';

const ArtistInfo: React.FC<ArtistInfoProps> = ({ item, loading, reCallApi }) => {
  const { setError, setSuccess } = useContext(KContext);
  const handleFollowArtist = async (id: number) => {
    const res = await followArtist(id);
    if (res?.status === 201) setSuccess('Theo dõi thành công!');
    else setError('Theo dõi thất bại!');
    reCallApi && reCallApi();
  };
  const handleUnFollowArtist = async (id: number) => {
    const res = await unfollowArtist(id);
    console.log(res);
    if (res?.status === 200) setSuccess('Bỏ Theo dõi thành công!');
    else setError('Bỏ Theo dõi thất bại!');
    reCallApi && reCallApi();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {loading ? (
        <StyleSkeleton>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
            <Skeleton variant="circular" width={200} height={200} animation="wave" />
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
              <Skeleton variant="text" width={100} animation="wave" />
              <Skeleton variant="text" width={80} animation="wave" />
              <Skeleton variant="rectangular" width={120} height={40} animation="wave" />
            </Box>
          </Box>
        </StyleSkeleton>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <StyledArtistWrapper>
            <Image src={item?.image ?? images.noImage} />
          </StyledArtistWrapper>
          <StyledArtistInfo>
            <Box
              sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              textAlign={'center'}
              fontWeight={'500'}
            >
              {item.name}
            </Box>
            {!item.followed ? (
              <Button
                sx={{ borderRadius: '18px' }}
                variant="contained"
                onClick={() => handleFollowArtist(item.id)}
                component="button"
                startIcon={<PersonAddAlt />}
              >
                <Box>Theo dõi</Box>
              </Button>
            ) : (
              <Button
                sx={{ borderRadius: '18px' }}
                variant="contained"
                onClick={() => handleUnFollowArtist(item.id)}
                component="button"
                color="error"
              >
                <Box>Bỏ theo dõi</Box>
              </Button>
            )}
          </StyledArtistInfo>
        </Box>
      )}
    </Box>
  );
};

export default ArtistInfo;
