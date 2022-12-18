import styled from "styled-components";

export const SideBarContainer = styled.div`
  width: 18%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SideBarWraper = styled.div`
  width: 95%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 36px;
  background-color: ${({ theme }) => theme.colors.backgroundCards};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 3.5px 7px rgba(0, 0, 0, 0.25), 0 3px 4px rgba(0, 0, 0, 0.22);
  }
`;

export const SideBarLogoWarper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
`;

export const SideBarLogo = styled.img`
  width: 200px;
  height: 200px;
`;

export const SideBarName = styled.p`
  font-size: 30px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  margin-bottom: 40px;
`;

export const SideBarNameItems = styled.p`
  font-size: 22px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 400;
  margin-bottom: 10px;
`;
