import GlobalStyles from "./styles/global";
import { light } from "./styles/themes/light";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Body from "./components/Body";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import DashBoard from "./components/DashBoard";
function App() {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyles />
      <Body>
        <SideBar />
        <Main>
          <Header />
          <DashBoard />
        </Main>
      </Body>
    </ThemeProvider>
  );
}

export default App;
