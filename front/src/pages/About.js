import styled from 'styled-components';

import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';

function About() {
  return (
    <>
      <Header></Header>
      <StyledMain></StyledMain>
      <Footer></Footer>
    </>
  );
}

export default About;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: calc(100vh - 200px);
  min-width: 600px;

  @media (max-width: 600px) {
    min-width: 440px;
  }
`;
