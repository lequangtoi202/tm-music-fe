import AlbumItem from './AlbumItem';
import { Container } from './styles';
import { AlbumItemsProps } from './types';

const AlbumContainer: React.FC<AlbumItemsProps> = ({ items }) => {
  return (
    <Container>
      {items.map((item, index) => (
        <AlbumItem key={index} item={item}></AlbumItem>
      ))}
    </Container>
  );
};

export default AlbumContainer;
