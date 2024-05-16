import { Link } from 'react-router-dom';
import images from '../../assets/images';
import Image from '../Image';
import { PLaylistTitle } from '../Playlist/PlaylistTitle';
import { RoundedSkeleton, TitleSkeleton } from '../Skeleton';
import { StyledWrapper } from '../Theme/styles';
import { Container, StyledChildGenreItem, StyledGenreItem } from './styles';
import { GenreItemsProps } from './types';

const GenreContainer: React.FC<GenreItemsProps> = ({ genres, loading }) => {
  return (
    <Container>
      {genres.map((item, idx) => (
        <StyledGenreItem key={idx}>
          <StyledChildGenreItem>
            {loading ? (
              <RoundedSkeleton />
            ) : (
              <StyledWrapper>
                <Link to={`/genres/${item.id}`}>
                  <Image src={item.image ?? images.noImage} alt="" />
                </Link>
              </StyledWrapper>
            )}
          </StyledChildGenreItem>
          {loading ? <TitleSkeleton /> : <PLaylistTitle id={item.id} title={item.title} />}
        </StyledGenreItem>
      ))}
    </Container>
  );
};

export default GenreContainer;
