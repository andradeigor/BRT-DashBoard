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
  Select,
  TotalSalesMainContantTitleContainer,
  TotalSalesMainContantTitleWarper,
  TotalSalesMainContantTitle,
  TotalSalesMainContantNeightboorhood,
  TotalSalesMainContantNumbersContainer,
  TotalSalesMainContantNumbers,
  StationsPerIDHContainer,
  SalesPerNeightborhoodContainer,
  SalesPerNeightborhoodHeader,
  SalesPerNeightborhoodHeaderItem,
  SalesPerNeightborhoodHeaderItem2,
  SalesPerNeightborhoodHeaderTitle,
  SalesPerNeightborhoodMainContainer,
  SalesPerNeightborhoodMainWarper,
  SelectItems,
  TooltipContainer,
} from "./styled";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Sector,
} from "recharts";
import { useEffect, useState } from "react";
import BussImagePath from "../../assets/buss.svg";
import BussStopImagePath from "../../assets/bussStop.svg";
import axios from "axios";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <TooltipContainer>
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="label">{`Posição: ${payload[0].payload.position}`}</p>
      </TooltipContainer>
    );
  }
  return null;
};
const CustomTooltipPie = ({ active, payload, label }) => {
  if (active) {
    return (
      <TooltipContainer>
        <p className="label">{`${payload[0].payload.descricao} : ${payload[0].value}`}</p>
      </TooltipContainer>
    );
  }
  return null;
};
const Dashboard = () => {
  const [dataBrt, setDataBRT] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  const [totalVendas, setTotalVendas] = useState(0.0);
  const [dataVendasPorEstacao, setDataVendasPorEstacao] = useState([]);
  const [dataEstacoesPorBairroHigh, setDataEstacoesPorBairroHigh] = useState(
    []
  );
  const [dataEstacoesPorBairro, setDataEstacoesPorBairro] = useState([]);
  const [pieData, setPieData] = useState([]);
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

  useEffect(() => {
    axios
      .get("http://localhost:8000/estacao/estacoesPorBairro")
      .then(({ data }) => {
        const size = data.length;
        const minorIDH = { ...data[0], fill: "#FF9300", position: size };
        const greaterIDH = { ...data[size - 1], position: 1 };
        const minorIDHwithBRT = [];
        const greaterIDHwithBRT = [];
        const filtredData = data.filter((item) => item.QntdEstacao > 0);
        const size2 = filtredData.length;
        minorIDHwithBRT.push(
          {
            ...filtredData[0],
            position: size - data.indexOf(filtredData[0]),
            fill: "#FF9300",
          },
          {
            ...filtredData[1],
            position: size - data.indexOf(filtredData[1]),
            fill: "#FF9300",
          }
        );
        greaterIDHwithBRT.push(
          {
            ...filtredData[size2 - 1],
            position: size - data.indexOf(filtredData[size2 - 1]),
          },
          {
            ...filtredData[size2 - 2],
            position: size - data.indexOf(filtredData[size2 - 2]),
          }
        );
        setDataEstacoesPorBairroHigh([
          greaterIDH,
          ...greaterIDHwithBRT,
          ...minorIDHwithBRT,
          minorIDH,
        ]);
      });
  }, []);

  useEffect(() => {
    let bairrosData = [];
    let Total = 0;
    axios
      .get("http://localhost:8000/estacao/vendasEstacaoPorIDH?filter=IDH")
      .then(({ data }) => {
        bairrosData = data;
      })
      .then(() => {
        axios
          .get("http://localhost:8000/estacao/VendasSoma")
          .then(({ data }) => (Total = parseInt(data[0].Total)))
          .then(() => {
            let QntdIDHBaixo = 0;
            for (let index = 0; index < 10; index++) {
              QntdIDHBaixo += parseInt(bairrosData[index].vendas);
            }

            setPieData([
              { vendas: QntdIDHBaixo, fill: "#FF9300", descricao: "BaixoIDH" },
              {
                vendas: Total - QntdIDHBaixo,
                fill: "#5C53BD",
                descricao: "Outros",
              },
            ]);
          });
      });
  }, []);

  const HandleSelect = (e) => {
    let bairrosData = [];
    let Total = 0;
    if (e === "E.Pobreza") {
      axios
        .get(
          "http://localhost:8000/estacao/vendasEstacaoPorIDH?filter=Extrema_Pobreza"
        )
        .then(({ data }) => {
          bairrosData = data;
        })
        .then(() => {
          axios
            .get("http://localhost:8000/estacao/VendasSoma")
            .then(({ data }) => (Total = parseInt(data[0].Total)))
            .then(() => {
              let E_Pobreza = 0;
              for (let index = 0; index < 10; index++) {
                E_Pobreza += parseInt(bairrosData[index].vendas);
              }

              setPieData([
                {
                  vendas: E_Pobreza,
                  fill: "#FF9300",
                  descricao: "E.Pobreza",
                },
                {
                  vendas: Total - E_Pobreza,
                  fill: "#5C53BD",
                  descricao: "Outros",
                },
              ]);
            });
        });
    } else if (e === "Pobreza") {
      axios
        .get("http://localhost:8000/estacao/vendasEstacaoPorIDH?filter=Pobreza")
        .then(({ data }) => {
          bairrosData = data;
        })
        .then(() => {
          axios
            .get("http://localhost:8000/estacao/VendasSoma")
            .then(({ data }) => (Total = parseInt(data[0].Total)))
            .then(() => {
              let Pobreza = 0;
              for (let index = 0; index < 10; index++) {
                Pobreza += parseInt(bairrosData[index].vendas);
              }

              setPieData([
                {
                  vendas: Pobreza,
                  fill: "#FF9300",
                  descricao: "Pobreza",
                },
                {
                  vendas: Total - Pobreza,
                  fill: "#5C53BD",
                  descricao: "Outros",
                },
              ]);
            });
        });
    } else if (e === "B.Renda") {
      axios
        .get(
          "http://localhost:8000/estacao/vendasEstacaoPorIDH?filter=Baixa_Renda"
        )
        .then(({ data }) => {
          bairrosData = data;
        })
        .then(() => {
          axios
            .get("http://localhost:8000/estacao/VendasSoma")
            .then(({ data }) => (Total = parseInt(data[0].Total)))
            .then(() => {
              let Qntd_BaixaRenda = 0;
              for (let index = 0; index < 10; index++) {
                Qntd_BaixaRenda += parseInt(bairrosData[index].vendas);
              }

              setPieData([
                {
                  vendas: Qntd_BaixaRenda,
                  fill: "#FF9300",
                  descricao: "Baixa Renda",
                },
                {
                  vendas: Total - Qntd_BaixaRenda,
                  fill: "#5C53BD",
                  descricao: "Outros",
                },
              ]);
            });
        });
    } else if (e == "Qntd_BolsaFamilia") {
      axios
        .get(
          "http://localhost:8000/estacao/vendasEstacaoPorIDH?filter=Qntd_BolsaFamilia"
        )
        .then(({ data }) => {
          bairrosData = data;
        })
        .then(() => {
          axios
            .get("http://localhost:8000/estacao/VendasSoma")
            .then(({ data }) => (Total = parseInt(data[0].Total)))
            .then(() => {
              let Qntd_BolsaFamilia = 0;
              for (let index = 0; index < 10; index++) {
                Qntd_BolsaFamilia += parseInt(bairrosData[index].vendas);
              }

              setPieData([
                {
                  vendas: Qntd_BolsaFamilia,
                  fill: "#FF9300",
                  descricao: "Bolsa Familia",
                },
                {
                  vendas: Total - Qntd_BolsaFamilia,
                  fill: "#5C53BD",
                  descricao: "Outros",
                },
              ]);
            });
        });
    } else {
      axios
        .get("http://localhost:8000/estacao/vendasEstacaoPorIDH?filter=IDH")
        .then(({ data }) => {
          bairrosData = data;
        })
        .then(() => {
          axios
            .get("http://localhost:8000/estacao/VendasSoma")
            .then(({ data }) => (Total = parseInt(data[0].Total)))
            .then(() => {
              let QntdIDHBaixo = 0;
              for (let index = 0; index < 10; index++) {
                QntdIDHBaixo += parseInt(bairrosData[index].vendas);
              }

              setPieData([
                {
                  vendas: QntdIDHBaixo,
                  fill: "#FF9300",
                  descricao: "BaixoIDH",
                },
                {
                  vendas: Total - QntdIDHBaixo,
                  fill: "#5C53BD",
                  descricao: "Outros",
                },
              ]);
            });
        });
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
      <StationsPerIDHContainer>
        <TotalSalesHeader>
          <TotalSalesHeaderTitleContainer>
            <TotalSalesHeaderTitle>Bairros:</TotalSalesHeaderTitle>
          </TotalSalesHeaderTitleContainer>
        </TotalSalesHeader>
        <ResponsiveContainer width="95%" height="75%">
          <BarChart width={300} height={100} data={dataEstacoesPorBairroHigh}>
            <Bar dataKey="QntdEstacao" fill="#5C53BD" />
            <XAxis dataKey="Nome_Bairro" />
            <Tooltip content={<CustomTooltip />} />
          </BarChart>
        </ResponsiveContainer>
      </StationsPerIDHContainer>
      <SalesPerNeightborhoodContainer>
        <SalesPerNeightborhoodHeader>
          <SalesPerNeightborhoodHeaderItem>
            <SalesPerNeightborhoodHeaderTitle>
              Contribuição por Condição
            </SalesPerNeightborhoodHeaderTitle>
          </SalesPerNeightborhoodHeaderItem>
        </SalesPerNeightborhoodHeader>
        <SalesPerNeightborhoodMainContainer>
          <SalesPerNeightborhoodHeaderItem2>
            <Select onChange={(e) => HandleSelect(e.target.value)}>
              <SelectItems value="IDH">IDH</SelectItems>
              <SelectItems value="E.Pobreza">E.Pobreza</SelectItems>
              <SelectItems value="Pobreza">Pobreza</SelectItems>
              <SelectItems value="B.Renda">B.Renda</SelectItems>
              <SelectItems value="Qntd_BolsaFamilia">B.Familia</SelectItems>
            </Select>
          </SalesPerNeightborhoodHeaderItem2>
          <SalesPerNeightborhoodMainWarper>
            <ResponsiveContainer>
              <PieChart width="95%" height="75%">
                <Pie
                  data={pieData}
                  innerRadius={60}
                  cx="50%"
                  cy="50%"
                  stroke={false}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={3}
                  dataKey="vendas"
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value,
                    index,
                    fill,
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius =
                      25 + innerRadius + (outerRadius - innerRadius);
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill={fill}
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {pieData[index].descricao}
                      </text>
                    );
                  }}
                />
                <Tooltip content={<CustomTooltipPie />} />
              </PieChart>
            </ResponsiveContainer>
          </SalesPerNeightborhoodMainWarper>
        </SalesPerNeightborhoodMainContainer>
      </SalesPerNeightborhoodContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
