import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function NavBar(props) {
   const [isToggle, setIsToggle] = useState(false);

   return (
      <StyledNav>
         <StyledBtn
            onClick={() => setIsToggle((preState) => !preState)}
            onBlur={() => setIsToggle(false)}
            color={props.color}>
            <StyledSpread></StyledSpread>
            <StyledSpread></StyledSpread>
            <StyledSpread></StyledSpread>
         </StyledBtn>
         <StyledUl isToggle={isToggle}>
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
      </StyledNav>
   );
}

export default NavBar;

const StyledNav = styled.nav`
   position: relative;
`;

const StyledSpread = styled.div`
   width: 30px;
   height: 4px;
   background-color: rgba(51, 51, 51, 0.4);

   & + & {
      margin-top: 5px;
   }
`;

const StyledBtn = styled.button`
   display: none;
   background-color: transparent;
   border: none;
   border-radius: 50%;
   padding: 20px;
   cursor: pointer;
   font: normal normal normal 24px/1 'Material Design Icons';

   &:hover {
      background-color: ${(props) =>
         props.color !== 'white' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(999, 999, 999, 0.4)'};
      transition: background-color 0.2s cubic-bezier(0.4, 0, 0.6, 1);
   }

   @media (max-width: 600px) {
      display: block;
   }
`;

const StyledUl = styled.ul`
   display: flex;
   width: 340px;
   justify-content: space-evenly;

   @media (max-width: 600px) {
      ${(props) =>
         props.isToggle
            ? {
                 display: 'block',
                 position: 'absolute',
                 top: '40px',
                 right: '20px',
                 width: '100px',
                 height: '240px',
                 backgroundColor: 'white',
                 zIndex: '30',
                 textAlign: 'center',
                 borderRadius: '10px',
                 boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.4)',
              }
            : { display: 'none' }}
   }
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

   @media (max-width: 600px) {
      color: black;
   }
`;
