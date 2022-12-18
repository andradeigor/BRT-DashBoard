import styled from "styled-components";

export const DashboardContainer = styled.div`
  width: 100%;
  height: 90%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

export const TotalSalesContainer = styled.div`
  width: 50%;
  height: 50%;
  background-color: ${({ theme }) => theme.colors.backgroundCards};
  border-radius: 32px;
  margin-right: 100px;
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
  background-color: #0e1075;
  border-radius: 32px;
  border-bottom: 0.7px solid rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
`;

export const TotalSalesListHeaderTitle = styled.p`
  margin: 5px;
  font-size: 26px;
  color: ${(props) => props.theme.colors.backgroundCards};
  font-weight: 500;
  padding-left: 20px;
`;

export const TotalSalesHeaderTitleIcon = styled.img`
  width: 30px;
  margin-left: 20px;
`;

export const TotalSalesListMainContainer = styled.div`
  width: 100%;
  height: 75%;
  background-color: ${(props) => props.theme.colors.backgroundCards};
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #f0f1fc;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #f0f1fc;
  }
`;

export const TotalSalesListMainTitle = styled.p`
  margin: 20px;
  font-size: 12px;
  color: #b3b3a8;
`;

export const TotalSalesListMainContentContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const TotalSalesListMainContentItem = styled.div`
  width: 100%;
  height: 70px;
  padding: 10px;
  padding-left: 20px;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;

export const TotalSalesMainContantIconContainer = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f0f1fc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TotalSalesMainContantIcon = styled.img`
  width: 30px;
`;

export const TotalSalesMainContantTitleContainer = styled.div`
  height: 100%;
`;
export const TotalSalesMainContantTitleWarper = styled.div`
  height: 100%;
  width: 150px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const TotalSalesMainContantTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const TotalSalesMainContantNeightboorhood = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary};
`;

export const TotalSalesMainContantNumbersContainer = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
`;

export const TotalSalesMainContantNumbers = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const StationsPerIDHContainer = styled.div`
  width: 50%;
  height: 45%;
  margin-right: 100px;
  background-color: ${({ theme }) => theme.colors.backgroundCards};
  border-radius: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 3.5px 7px rgba(0, 0, 0, 0.25), 0 3px 4px rgba(0, 0, 0, 0.22);
  }
`;

export const SalesPerNeightborhoodContainer = styled.div`
  width: 300px;
  height: 45%;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.backgroundCards};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 3.5px 7px rgba(0, 0, 0, 0.25), 0 3px 4px rgba(0, 0, 0, 0.22);
  }
`;

export const SalesPerNeightborhoodHeader = styled.div`
  width: 100%;
  border-radius: 32px 32px 0 0;
  height: 100px;
  display: flex;
  align-items: center;
  border-bottom: 0.7px solid rgba(0, 0, 0, 0.25);
`;

export const SalesPerNeightborhoodHeaderItem = styled.div`
  height: 100%;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;
export const SalesPerNeightborhoodHeaderItem2 = styled.div`
  width: 100%;
  border-radius: 32px;
  display: flex;
  align-items: flex-start;
  justify-content: end;
`;

export const SalesPerNeightborhoodHeaderTitle = styled.p`
  background-color: ${({ theme }) => theme.colors.backgroundCards};
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

export const Select = styled.select`
  margin-top: 5px;
  text-align: center;
  border: none;
  background-color: ${({ theme }) => theme.colors.backgroundCards};
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  color: "#FFF";
  margin-bottom: 5px;
`;

export const SelectItems = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  color: "#FFF";
`;

export const SalesPerNeightborhoodMainContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
`;

export const SalesPerNeightborhoodMainWarper = styled.div`
  width: 100%;
  height: 80%;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
