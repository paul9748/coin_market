import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import LoginForm from 'components/User/LoginForm';
import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';

import ROUTE from 'utils/ROUTE';
import { useEffect } from 'react';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('ACCESS_TOKEN')) {
      navigate(ROUTE.MAIN);
    }
  }, [navigate]);

  return (
    <>
      <Header backColor="white"></Header>
      <StyledMain>
        <LoginForm></LoginForm>
      </StyledMain>
      <Footer></Footer>
    </>
  );
}

export default Login;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  min-height: calc(100vh - 200px);
  min-width: 600px;

  @media (max-width: 600px) {
    min-width: 440px;
  }
  @media (max-width: 450px) {
    min-width: 400px;
  }
  @media (max-width: 400px) {
    min-width: 390px;
  }

  background-color: rgb(42, 193, 188);
`;
