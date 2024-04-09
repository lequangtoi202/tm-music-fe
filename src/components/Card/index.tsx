import { PlayCircleOutline } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useContext } from 'react';
import { KContext } from '../../context';
import Image from '../Image';
import { StyleCardImage, StyledLayerHover } from './styles';
import { CardItemProps } from './types';

const CardItem: React.FC<CardItemProps> = ({ item }) => {
  const { setCurrentSong, setCurrentAlbum } = useContext(KContext);
  return (
    <StyleCardImage>
      <StyledLayerHover>
        <Tooltip placement="top" title="Phát">
          <IconButton
            onClick={() => {
              const randomSong = item?.songs[Math.floor(Math.random() * item.songs.length)];
              setCurrentSong(randomSong || null);
              setCurrentAlbum(item);
            }}
          >
            <PlayCircleOutline />
          </IconButton>
        </Tooltip>
      </StyledLayerHover>
      <Image src={item?.logo} alt="" />
    </StyleCardImage>
  );
};

export default CardItem;
