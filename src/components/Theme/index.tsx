import { useContext } from 'react';
import { MoreAction } from '../MoreAction';
import ThemeItem from './ThemeItem';
import { Container } from './styles';
import { ThemeItemsProps } from './types';
import { KContext } from '../../context';

const ThemeContainer: React.FC<ThemeItemsProps> = ({ items, loading }) => {
  const { currentAlbum } = useContext(KContext);
  return (
    <Container>
      {items?.map((item, index) => <ThemeItem key={index} item={item} loading={loading} />)}
      <MoreAction song={currentAlbum} />
    </Container>
  );
};

export default ThemeContainer;
