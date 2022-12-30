import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo_white from '../../assets/images/coin_market(6).png';
import logo_mint from '../../assets/images/coin_market(5).png';
import NavBar from '../NavBar';

function Header({ backColor, logoImage, color }) {
  return (
    <StyledHeader backColor={backColor}>
      <div>
        <Link to="/">
          {logoImage === 'white' ? (
            <StyledImg src={logo_white} alt="logo"></StyledImg>
          ) : (
            <StyledImg src={logo_mint} alt="logo"></StyledImg>
          )}
        </Link>
      </div>
      <NavBar color={color}></NavBar>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  display: flex;
  background-color: white;
  opacity: 0.9;
  justify-content: space-between;
  position: sticky;
  top: 0;
  align-items: center;
  height: 100px;
  padding: 4px 16px;
  box-sizing: border-box;
  background-color: ${(props) => props.backColor};
  min-width: 600px;
  z-index: 20;
  font-weight: bold;

  @media (max-width: 600px) {
    min-width: 440px;
  }
  @media (max-width: 450px) {
    min-width: 400px;
  }
  @media (max-width: 400px) {
    min-width: 390px;
  }
`;

const StyledImg = styled.img`
  width: 200px;
`;
