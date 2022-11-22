import styled from 'styled-components';
import logo from '../../assets/images/coin_market(4).png';
import { Link } from 'react-router-dom';

function Header() {
   return (
      <StyledHeader>
         <div>
            <Link to="/">
               <StyledImg src={logo} alt={'logo'}></StyledImg>
            </Link>
         </div>
         <nav>
            <StyledUl>
               <li>
                  <StyledLink to="/about">about</StyledLink>
               </li>

               <li>
                  <StyledLink to="/buy">구매</StyledLink>
               </li>

               <li>
                  <StyledLink to="/sell">판매</StyledLink>
               </li>

               <li>
                  <StyledLink to="/login">로그인</StyledLink>
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
   padding: 10px 20px;
   transition: background-Color 0.2s cubic-bezier(0.4, 0, 0.6, 1);

   &:hover {
      background-color: rgba(0, 0, 0, 0.1);
   }
`;
