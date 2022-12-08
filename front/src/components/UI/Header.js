import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo_white from '../../assets/images/coin_market(6).png';
import logo_mint from '../../assets/images/coin_market(5).png';
import NavBar from '../NavBar';

function Header(props) {
  return (
    <StyledHeader backColor={props.backColor}>
      <div>
        <Link to="/">
          {props.logoImage === 'white' ? (
            <StyledImg src={logo_white} alt="logo"></StyledImg>
          ) : (
            <StyledImg src={logo_mint} alt="logo"></StyledImg>
          )}
        </Link>
      </div>
      <NavBar color={props.color}></NavBar>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  display: flex;
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
`;

const StyledImg = styled.img`
  width: 200px;
`;
