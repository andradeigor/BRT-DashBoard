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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
const Dashboard = () => {
  const [dataBrt, setDataBRT] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [totalVendas, setTotalVendas] = useState(0.0);
  useEffect(() => {
    axios.get("http://localhost:8000/estacao/anos").then(({ data }) => {
      const newData = [];
      data.forEach((item) =>
        newData.push({
          ano: item.ano,
          vendas: parseFloat(item.totalVendas),
          vendasShow: parseFloat(item.totalVendas / 1000000),
        })
      );

      setDataBRT(newData);
      setDataToShow(newData);
    });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/estacao/vendasValores")
      .then(({ data }) => {
        let Total = 0;
        dataToShow.forEach((item) => {
          const found = data.find((e) => e.ano == item.ano);
          Total += parseFloat(found.tarifa) * item.vendas;
        });
        setTotalVendas(Math.round(Total / 1000000, 2));
      });
  }, [dataToShow]);
  const HandleSelect = (e) => {
    console.log(e);
    if (e == "todos") {
      setDataToShow(dataBrt);
    } else {
      setDataToShow(dataBrt.filter((item) => item.ano == e));
    }
  };
  return (
    <DashboardContainer>
      <TotalSalesContainer>
        <TotalSalesHeader>
          <TotalSalesHeaderTitleContainer>
            <TotalSalesHeaderTitle>R$:{totalVendas}M</TotalSalesHeaderTitle>
          </TotalSalesHeaderTitleContainer>
          <TotalSalesHeaderTitleContainer2>
            <form>
              <Select onChange={(e) => HandleSelect(e.target.value)}>
                <option value="todos">Todos</option>
                {dataBrt.map((item) => (
                  <option value={item.ano} key={item.ano}>
                    {item.ano}
                  </option>
                ))}
              </Select>
            </form>
          </TotalSalesHeaderTitleContainer2>
        </TotalSalesHeader>
        <ResponsiveContainer width="95%" height="75%">
          <LineChart width={300} height={100} data={dataToShow}>
            <Line
              type="monotone"
              dataKey="vendasShow"
              stroke="#5C53BD"
              strokeWidth={5}
            />
            <XAxis dataKey="ano" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </TotalSalesContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
