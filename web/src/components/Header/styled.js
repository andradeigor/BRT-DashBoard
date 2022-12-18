import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 10%;
  padding: 20px;
`;

export const HeaderFont = styled.p`
  line-height: 1.2;
  font-size: 30px;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
`;
