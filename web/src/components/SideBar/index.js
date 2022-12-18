import {
  SideBarContainer,
  SideBarWraper,
  SideBarLogoWarper,
  SideBarLogo,
  SideBarName,
  SideBarNameItems,
} from "./styled";
import { HeaderFont } from "../Header/styled";
import BussLogoPath from "../../assets/busslogo.svg";
const SideBar = () => {
  return (
    <SideBarContainer>
      <SideBarWraper>
        <SideBarLogoWarper>
          <SideBarLogo src={BussLogoPath} />
        </SideBarLogoWarper>
        <HeaderFont>BRT Dashboard:</HeaderFont>
        <SideBarName>Nomes:</SideBarName>
        <SideBarNameItems>Igor de Andrade</SideBarNameItems>
        <SideBarNameItems>Bernado Milewski</SideBarNameItems>
        <SideBarNameItems>Carolina Carvalho </SideBarNameItems>
      </SideBarWraper>
    </SideBarContainer>
  );
};

export default SideBar;
