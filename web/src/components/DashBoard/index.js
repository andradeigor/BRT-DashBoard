import {
  DashboardContainer,
  TotalSalesContainer,
  TotalSalesHeader,
  TotalSalesHeaderTitleContainer,
  TotalSalesHeaderTitle,
  TotalSalesHeaderTitleContainer2,
  TotalSalesListContainer,
  TotalSalesListHeader,
  TotalSalesListHeaderTitle,
  TotalSalesHeaderTitleIcon,
  TotalSalesListMainContainer,
  TotalSalesListMainTitle,
  TotalSalesListMainContentContainer,
  TotalSalesListMainContentItem,
  TotalSalesMainContantIcon,
  TotalSalesMainContantIconContainer,
  TotalSalesMainContantTitleContainer,
  TotalSalesMainContantTitleWarper,
  TotalSalesMainContantTitle,
  TotalSalesMainContantNeightboorhood,
  TotalSalesMainContantNumbersContainer,
  TotalSalesMainContantNumbers,
} from "./styled";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import BussImagePath from "../../assets/buss.svg";
import BussStopImagePath from "../../assets/bussStop.svg";
import axios from "axios";
const Dashboard = () => {
  const [dataBrt, setDataBRT] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [totalVendas, setTotalVendas] = useState(0.0);
  const [dataVendasPorEstacao, setDataVendasPorEstacao] = useState([]);
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
        setTotalVendas((Total / 1000000000).toFixed(2));
      });
  }, [dataToShow]);

  useEffect(() => {
    axios.get("http://localhost:8000/estacao/anosEstacao").then(({ data }) => {
      const filtredData = [];
      data.forEach((item) => {
        filtredData.push({
          ano: item.ano,
          Qntd:
            item.Qntd > 1000000
              ? (item.Qntd / 1000000).toFixed(2).toString() + "M"
              : item.Qntd,
          Nome: item.Nome.split("(")[0],
          Nome_Bairro: item.Nome_Bairro.split(",")[0],
        });
      });
      setDataVendasPorEstacao(filtredData);
    });
  }, []);

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
            <TotalSalesHeaderTitle>R$:{totalVendas}B</TotalSalesHeaderTitle>
          </TotalSalesHeaderTitleContainer>
          <TotalSalesHeaderTitleContainer2>
            Vendas por ano
          </TotalSalesHeaderTitleContainer2>
        </TotalSalesHeader>
        <ResponsiveContainer width="95%" height="75%">
          <LineChart width={300} height={100} data={dataToShow}>
            <Line
              type="monotone"
              dataKey="vendasShow"
              stroke="#5C53BD"
              strokeWidth={5}
              dot={false}
            />
            <XAxis dataKey="ano" />

            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </TotalSalesContainer>
      <TotalSalesListContainer>
        <TotalSalesListHeader>
          <TotalSalesHeaderTitleIcon src={BussImagePath} />
          <TotalSalesListHeaderTitle>Estações:</TotalSalesListHeaderTitle>
        </TotalSalesListHeader>
        <TotalSalesListMainContainer>
          <TotalSalesListMainTitle>
            Vendas por Estações:
          </TotalSalesListMainTitle>
          <TotalSalesListMainContentContainer>
            {dataVendasPorEstacao.map((item) => {
              return (
                <TotalSalesListMainContentItem>
                  <TotalSalesMainContantIconContainer>
                    <TotalSalesMainContantIcon src={BussStopImagePath} />
                  </TotalSalesMainContantIconContainer>
                  <TotalSalesMainContantTitleContainer>
                    <TotalSalesMainContantTitleWarper>
                      <TotalSalesMainContantTitle>
                        {item.Nome}
                      </TotalSalesMainContantTitle>
                      <TotalSalesMainContantNeightboorhood>
                        {item.Nome_Bairro}
                      </TotalSalesMainContantNeightboorhood>
                    </TotalSalesMainContantTitleWarper>
                  </TotalSalesMainContantTitleContainer>
                  <TotalSalesMainContantNumbersContainer>
                    <TotalSalesMainContantNumbers>
                      {item.Qntd}
                    </TotalSalesMainContantNumbers>
                    <TotalSalesMainContantNumbers>
                      {item.ano}
                    </TotalSalesMainContantNumbers>
                  </TotalSalesMainContantNumbersContainer>
                </TotalSalesListMainContentItem>
              );
            })}
          </TotalSalesListMainContentContainer>
        </TotalSalesListMainContainer>
      </TotalSalesListContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
