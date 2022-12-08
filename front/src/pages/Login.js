import styled from 'styled-components';

import LoginForm from 'components/User/LoginForm';
import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';

function Login() {
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

  background-color: rgb(42, 193, 188);
`;
