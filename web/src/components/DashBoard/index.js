import {
  DashboardContainer,
  TotalSalesContainer,
  TotalSalesHeader,
  TotalSalesHeaderTitleContainer,
  TotalSalesHeaderTitle,
  Select,
  TotalSalesHeaderTitleContainer2,
  SelectItems,
} from "./styled";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  return (
    <DashboardContainer>
      <TotalSalesContainer>
        <TotalSalesHeader>
          <TotalSalesHeaderTitleContainer>
            <TotalSalesHeaderTitle>R$:1.5M</TotalSalesHeaderTitle>
          </TotalSalesHeaderTitleContainer>
          <TotalSalesHeaderTitleContainer2>
            <form>
              <Select>
                <option value="todos">Todos</option>
              </Select>
            </form>
          </TotalSalesHeaderTitleContainer2>
        </TotalSalesHeader>
      </TotalSalesContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
