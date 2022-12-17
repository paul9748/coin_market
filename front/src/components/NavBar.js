import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ROUTE from 'utils/ROUTE';
import useProvideAuth from 'hooks/useProvideAuth';
import InfoModal from './InfoModal';

function NavBar({ color }) {
  const [isToggle, setIsToggle] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const { isLogin, setIsLogin } = useProvideAuth();

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (document.getElementById('navBar').contains(e.target)) {
        //Clicked in box
      } else {
        //Clicked outside the box
        setIsToggle(false);
        setIsModal(false);
      }
    });
    window.addEventListener('resize', () => {
      if (isToggle) return setIsToggle(false), setIsModal(false);
    });

    return () => {
      window.removeEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });

      window.removeEventListener('resize', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    };
  }, [isToggle]);

  return (
    <StyledNav id="navBar">
      <StyledBtn
        onClick={(e) => {
          e.stopPropagation();
          setIsToggle((preState) => !preState);
          setIsModal(false);
        }}
        color={color}>
        <StyledSpread></StyledSpread>
        <StyledSpread></StyledSpread>
        <StyledSpread></StyledSpread>
      </StyledBtn>
      <StyledUl isToggle={isToggle} onBlur={(e) => e.stopPropagation()}>
        <li>
          <StyledLink to={ROUTE.ABOUT} color={color}>
            about
          </StyledLink>
        </li>

        <li>
          <StyledLink to={ROUTE.BUY} color={color}>
            구매
          </StyledLink>
        </li>

        <li>
          <StyledLink to={ROUTE.SELL} color={color}>
            판매
          </StyledLink>
        </li>

        {isLogin ? (
          <StyledMyinfoBtn
            color={color}
            onClick={() => {
              setIsModal((preState) => !preState);
              setIsToggle(false);
            }}>
            내정보
          </StyledMyinfoBtn>
        ) : (
          <li>
            <StyledLink to={ROUTE.LOGIN} color={color}>
              로그인
            </StyledLink>
          </li>
        )}
      </StyledUl>
      {isModal ? (
        <InfoModal
          color={color}
          setIsLogin={setIsLogin}
          setIsModal={setIsModal}></InfoModal>
      ) : null}
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

const StyledMyinfoBtn = styled.button`
  height: 60px;
  padding: 10px 20px;
  display: block;
  border: none;
  color: ${(props) => props.color};
  background-color: transparent;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 600px) {
    margin: 0 auto;
    color: black;
  }
`;
