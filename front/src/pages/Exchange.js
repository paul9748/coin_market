import styled from 'styled-components';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Footer from 'components/UI/Footer';
import Header from 'components/UI/Header';
import ExchangePoint from 'components/Exchange/ExchangePoint';
import ROUTE from 'utils/ROUTE';

function Exchange() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem('ACCESS_TOKEN')) {
      alert('로그인이 필요합니다.');
      navigate(ROUTE.LOGIN);
    }
  }, [navigate]);

  return (
    <>
      <Header></Header>
      <StyledMain>
        <ExchangePoint></ExchangePoint>
      </StyledMain>
      <Footer></Footer>
    </>
  );
}

export default Exchange;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-top: 20px solid rgba(0, 0, 0, 0.1);

  min-height: calc(100vh - 200px);
  min-width: 600px;

  @media (max-width: 600px) {
    min-width: 300px;
  }
`;
