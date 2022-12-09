import { render } from '@testing-library/react';
import Main from 'pages/Main';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import ROUTE from 'utils/ROUTE';

function InfoModal({ color }) {
  return (
    <StyledDiv>
      <li>
        <StyledLink to={ROUTE.MYPAGE} color={color}>
          마이페이지
        </StyledLink>
      </li>
      <li>
        <StyledLink
          onClick={() => {
            sessionStorage.clear(), render(<Main></Main>);
          }}
          to={ROUTE.MAIN}
          color={color}>
          로그아웃
        </StyledLink>
      </li>
    </StyledDiv>
  );
}

export default InfoModal;

const StyledDiv = styled.div`
  display: block;
  position: absolute;
  top: 60px;
  right: 20px;
  width: 150px;
  height: 150px;
  background-color: white;
  z-index: 30;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.4);
`;

const StyledLink = styled(Link)`
  display: block;
  height: 40px;
  line-height: 40px;
  padding: 10px 20px;
  transition: background-Color 0.2s cubic-bezier(0.4, 0, 0.6, 1);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
