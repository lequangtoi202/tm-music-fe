import { PersonAddAlt } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import Image from '../Image';
import { StyledArtistInfo, StyledArtistWrapper } from './styles';
import { ArtistInfoProps } from './types';

const ArtistInfo: React.FC<ArtistInfoProps> = ({ item }) => {
  return (
    <Box sx={{ flex: 1 }}>
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
  );
};

export default ArtistInfo;
