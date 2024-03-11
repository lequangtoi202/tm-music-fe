import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding-left: 24px;
  padding-right: 24px;
  justify-content: space-between;

  @media (max-width: 1200px) {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }
`;

const StyledHistoryItem = styled.div`
  flex: 1;
  margin: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  cursor: pointer;
  height: 120px;
  width: 120px;


  @media (max-width: 992px) {
    & > div {
      height: 100px;
      width: 100px;
    }
  }
`;

export { Container, StyledHistoryItem };
