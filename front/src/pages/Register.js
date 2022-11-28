import styled from 'styled-components';

import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';
import RegisterForm from 'components/User/RegisterForm';

function Register() {
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

  background-color: rgb(42, 193, 188);
`;
