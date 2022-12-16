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
  height: 95%;
  border-radius: 36px;
  background-color: "#FFF";
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 3.5px 7px rgba(0, 0, 0, 0.25), 0 3px 4px rgba(0, 0, 0, 0.22);
  }
`;
