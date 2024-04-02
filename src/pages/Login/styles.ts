import styled from 'styled-components';

const StyledLink = styled.span`
  margin-left: 4px;
  & > a {
    color: #1976d2;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export { StyledLink };
