import styled from "styled-components";

export const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const TotalSalesContainer = styled.div`
  width: 50%;
  height: 50%;
  background-color: ${({ theme }) => theme.colors.backgroundCards};
  background-color: red;
  border-radius: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 3.5px 7px rgba(0, 0, 0, 0.25), 0 3px 4px rgba(0, 0, 0, 0.22);
  }
`;

export const TotalSalesHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundCards};
  width: 100%;
  height: 100px;
  border-radius: 32px;
  display: flex;
`;

export const TotalSalesHeaderTitleContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundCards};
  height: 100%;
  padding: 30px;
  width: 50%;
  border-radius: 32px;
`;

export const TotalSalesHeaderTitle = styled.p`
  line-height: 1.2;
  font-size: 32px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  padding-left: 20px;
`;
export const TotalSalesHeaderTitleContainer2 = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundCards};
  height: 100%;
  padding: 30px;
  width: 50%;
  border-radius: 32px;
  display: flex;
  flex-direction: row-reverse;
`;

export const Select = styled.select`
  margin-top: 5px;
  border: none;
  background-color: ${({ theme }) => theme.colors.backgroundCards};
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  color: "#FFF";
`;

export const SelectItems = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  color: "#FFF";
`;
