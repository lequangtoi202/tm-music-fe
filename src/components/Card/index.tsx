import { PlayCircleOutline } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useContext } from 'react';
import { KContext } from '../../context';
import Image from '../Image';
import { StyleCardImage, StyledLayerHover } from './styles';
import { CardItemProps } from './types';
import images from '../../assets/images';
import { setTempCurrentAlbum, setTempCurrentSong } from '../../utils/storage';

const CardItem: React.FC<CardItemProps> = ({ item }) => {
  const { setCurrentSong, setCurrentAlbum, setError } = useContext(KContext);
  return (
    <StyleCardImage>
      <StyledLayerHover>
        <Tooltip placement="top" title="Phát">
          <IconButton
            onClick={() => {
              if (!item?.songs || item?.songs?.length === 0) setError('Album không có bài hát');
              const randomSong = item?.songs ? item.songs[Math.floor(Math.random() * item.songs?.length)] : null;
              setCurrentSong(randomSong || null);
              setCurrentAlbum(item);
              setTempCurrentSong(randomSong || null);
              setTempCurrentAlbum(item);
            }}
          >
            <PlayCircleOutline />
          </IconButton>
        </Tooltip>
      </StyledLayerHover>
      <Image src={item?.image ?? images.noImage} alt="" />
    </StyleCardImage>
  );
};

export default CardItem;
