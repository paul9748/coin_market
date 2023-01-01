import styled from 'styled-components';
import SimpleSlider from 'components/About/Carousel';
import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';
// import about from 'components/About/about';
import AboutDetail from 'components/About/about';

function About() {
  return (
    <>
      <Header></Header>
      <StyledMain>
        <AboutDetail />
        <div>
          <SimpleSlider></SimpleSlider>
        </div>
      </StyledMain>
      <Footer></Footer>
    </>
  );
}

export default About;

const StyledMain = styled.main`
  /* display: flex; */
  flex-direction: column;
  justify-content: space-between;

  vertical-align: 'center';
  text-align: center;
  padding: 0;

  min-height: calc(100vh - 200px);
  min-height: 500px;
  min-width: 400px;
  /* background-color: #ccf2f4; */

  @media (max-width: 600px) {
    min-width: 440px;
  }
  @media (max-width: 450px) {
    min-width: 400px;
  }
  @media (max-width: 400px) {
    min-width: 390px;
  }
`;
