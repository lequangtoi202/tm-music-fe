import { Box } from '@mui/material';
import { ArtistInfoProps } from './types';
import { FollowButton, StyledArtistInfo, StyledArtistWrapper } from './styles';
import Image from '../Image';
import { PersonAddAlt } from '@mui/icons-material';

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
        <FollowButton>
          <PersonAddAlt />
          <Box>Theo dõi</Box>
        </FollowButton>
      </StyledArtistInfo>
    </Box>
  );
};

export default ArtistInfo;
