import ThemeItem from './ThemeItem';
import { Container } from './styles';
import { ThemeItemsProps } from './types';

const ThemeContainer: React.FC<ThemeItemsProps> = ({ items, loading }) => {
  return (
    <Container>
      {items.map((item, index) => (
        <ThemeItem key={index} item={item} loading={loading} />
      ))}
    </Container>
  );
};

export default ThemeContainer;
