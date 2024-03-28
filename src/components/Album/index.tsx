import { FavoriteBorder, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import Image from '../Image';
import { RoundedSkeleton } from '../Skeleton';
import { StyledLayerHover, StyledWrapper } from '../Theme/styles';
import { Container, StyledAlbumItem, StyledChildAlbumItem } from './styles';
import { AlbumItemsProps } from './types';

const AlbumContainer: React.FC<AlbumItemsProps> = ({ items }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <Container>
      {items.map((item, index) => (
        <StyledAlbumItem key={index}>
          <StyledChildAlbumItem>
            {loading ? (
              <RoundedSkeleton />
            ) : (
              <StyledWrapper>
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
          </StyledChildAlbumItem>
        </StyledAlbumItem>
      ))}
    </Container>
  );
};

export default AlbumContainer;
