import styled from "styled-components";

export const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  gap: 200px;
  display: flex;
  justify-content: center;
`;

export const TotalSalesContainer = styled.div`
  width: 50%;
  height: 50%;
  background-color: ${({ theme }) => theme.colors.backgroundCards};
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
  font-size: 16px;
  font-weight: 500;
`;

export const TotalSalesListContainer = styled.div`
  width: 300px;
  height: 50%;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.backgroundCards};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 3.5px 7px rgba(0, 0, 0, 0.25), 0 3px 4px rgba(0, 0, 0, 0.22);
  }
`;

export const TotalSalesListHeader = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.backgroundCards};
  border-radius: 32px 32px 0 0;
  border-bottom: 0.7px solid rgba(0, 0, 0, 0.25);
`;
