import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo_mint from '../../assets/images/coin_market(4).png';
import logo_white from '../../assets/images/coin_market(3).png';

function Header(props) {
   return (
      <StyledHeader backColor={props.backColor}>
         <div>
            <Link to="/">
               {props.logoImage === 'white' ? (
                  <StyledImg src={logo_white} alt={'logo'}></StyledImg>
               ) : (
                  <StyledImg src={logo_mint} alt={'logo'}></StyledImg>
               )}
            </Link>
         </div>
         <nav>
            <StyledUl>
               <li>
                  <StyledLink to="/about" color={props.color}>
                     about
                  </StyledLink>
               </li>

               <li>
                  <StyledLink to="/buy" color={props.color}>
                     구매
                  </StyledLink>
               </li>

               <li>
                  <StyledLink to="/sell" color={props.color}>
                     판매
                  </StyledLink>
               </li>

               <li>
                  <StyledLink to="/login" color={props.color}>
                     로그인
                  </StyledLink>
               </li>
            </StyledUl>
         </nav>
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
   min-width: 1260px;
   z-index: 20;
`;

const StyledImg = styled.img`
   width: 200px;
`;

const StyledUl = styled.ul`
   display: flex;
   width: 400px;
   justify-content: space-evenly;
`;

const StyledLink = styled(Link)`
   display: block;
   height: 40px;
   line-height: 40px;
   padding: 10px 20px;
   transition: background-Color 0.2s cubic-bezier(0.4, 0, 0.6, 1);

   color: ${(props) => props.color};

   &:hover {
      background-color: rgba(0, 0, 0, 0.1);
   }
`;
