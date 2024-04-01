import { PersonAddAlt } from '@mui/icons-material';
import { Box, Button, Skeleton } from '@mui/material';
import Image from '../Image';
import { StyledArtistInfo, StyledArtistWrapper } from './styles';
import { ArtistInfoProps } from './types';

const ArtistInfo: React.FC<ArtistInfoProps> = ({ item, loading }) => {
  return (
    <Box sx={{ flex: 1 }}>
      {loading ? ( // Kiểm tra nếu đang loading thì hiển thị skeleton
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
          <Skeleton variant="circular" width={200} height={200} animation="wave" />
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
            <Skeleton variant="text" width={100} animation="wave" />
            <Skeleton variant="text" width={80} animation="wave" />
            <Skeleton variant="rectangular" width={120} height={40} animation="wave" />
          </Box>
        </Box>
      ) : (
        <Box>
          <StyledArtistWrapper>
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa1ImFbhrW5SftT6gG9xlgF6ttY70FPOXucQ&usqp=CAU"></Image>
          </StyledArtistWrapper>
          <StyledArtistInfo>
            <Box textAlign={'center'} fontWeight={'500'}>
              {item.name}
            </Box>
            <Box textAlign={'center'} fontSize={12}>
              70K quan tâm
            </Box>
            <Button sx={{ borderRadius: '18px' }} variant="contained" startIcon={<PersonAddAlt />}>
              <Box>Theo dõi</Box>
            </Button>
          </StyledArtistInfo>
        </Box>
      )}
    </Box>
  );
};

export default ArtistInfo;
