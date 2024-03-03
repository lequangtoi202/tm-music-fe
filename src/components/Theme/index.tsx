import ThemeItem from './ThemeItem';
import { Container } from './styles';
import { ThemeItemsProps } from './types';

const ThemeContainer: React.FC<ThemeItemsProps> = ({ items }) => {
  return (
    <Container>
      {items.map((item, index) => (
        <ThemeItem key={index} item={item} />
      ))}
    </Container>
  );
};

export default ThemeContainer;
