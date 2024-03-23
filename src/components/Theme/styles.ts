import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 14px;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: center;
    padding: 0 16px;
    gap: 8px;
  }

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const StyledThemeItem = styled.div`
  flex: 1;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  cursor: pointer;
  height: 200px;
  width: 200px;

  @media (max-width: 768px) {
    flex-basis: calc(50% - 16px);
    & > div {
      height: 184px;
      width: 184px;
    }
  }

  @media (max-width: 480px) {
    flex-basis: calc(50% - 16px);
    & > div {
      height: 130px;
      width: 130px;
    }
  }
`;

export { Container, StyledThemeItem };
