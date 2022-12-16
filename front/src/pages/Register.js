import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';
import RegisterForm from 'components/User/RegisterForm';

import ROUTE from 'utils/ROUTE';

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('ACCESS_TOKEN')) {
      navigate(ROUTE.MAIN);
    }
  }, [navigate]);

  return (
    <>
      <Header backColor="white" />
      <StyledMain>
        <RegisterForm></RegisterForm>
      </StyledMain>
      <Footer />
    </>
  );
}

export default Register;

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
