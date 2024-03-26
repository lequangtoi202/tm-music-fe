import styled from 'styled-components';

const StyledArtistList = styled.div`
  padding: 0 24px;
  margin: 8px 0 60px 0;
  display: flex;
  gap: 32px;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  @media (max-width: 480px) {
    gap: 10px;
  }

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

export { StyledArtistList };
