import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';
import ROUTE from 'utils/ROUTE';

import firstStep from 'assets/images/capture_image_color.png';
import secondStep from 'assets/images/upload_image_black.png';
import thirdStep from 'assets/images/coinCheck_image_color.png';
import fourthStep from 'assets/images/shipping_image_blue.png';
import prideImage from 'assets/images/pride_image.png';
import surpriseImage from 'assets/images/surprise_image.png';
import percent from 'assets/images/mark_percent.png';

import elice from 'assets/images/elice_logo.png';
import cocoa from 'assets/images/cocoa_logo.png';
import mever from 'assets/images/mever_logo.png';
import tasss from 'assets/images/tasss_logo.png';

import useScrollFadeIn from 'hooks/useScrollFadeIn';
import useScrollClipPath from 'hooks/useScrollClipPath';

import usa from 'assets/images/usa_flag.png';
import japan from 'assets/images/japan_flag.png';
import china from 'assets/images/china_flag.png';
import eu from 'assets/images/eu_flag.png';

function Main() {
  const [date, setDate] = useState('');
  const [JPY, setJPY] = useState();
  const [USD, setUSD] = useState();
  const [CNY, setCNY] = useState();
  const [EUR, setEUR] = useState();

  const URL = 'https://api.manana.kr/exchange/rate/KRW/JPY,USD,CNY,EUR.json';

  const getData = async () => {
    await axios
      .get(URL)
      .then((res) => {
        const data = res.data;
        const TIME_ZONE = 3240 * 10000;
        setDate(new Date(+new Date() + TIME_ZONE).toISOString().split('T')[0]);

        setJPY(data[0].rate);
        setUSD(data[1].rate);
        setCNY(data[2].rate);
        setEUR(data[3].rate);
      })
      .catch((error) => {
        window.location.reload();
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const animatedItem = {
    0: useScrollFadeIn('up', 1.2, 0.2),
    1: useScrollFadeIn('up', 1.4, 0.2),
    2: useScrollFadeIn('up', 1, 0),
    3: useScrollFadeIn('up', 1, 0),
    4: useScrollFadeIn('right', 1, 1),
  };

  const animatedImage = useScrollClipPath();

  const first = useRef();
  const second = useRef();
  const third = useRef();
  const fourth = useRef();
  const fifth = useRef();

  const elementNum = [first, second, third, fourth, fifth];

  const goBox = (element) => {
    return function () {
      element.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
  };

  function NavBtn(idx) {
    let color = ['none', 'none', 'none', 'none', 'none'];
    color[idx.idx - 1] = 'blue';
    return (
      <>
        {elementNum.map((ele, index) => (
          <div
            key={index}
            onClick={goBox(ele)}
            style={{ backgroundColor: color[index] }}></div>
        ))}
      </>
    );
  }

  return (
    <>
      <Header></Header>
      <StyledMain>
        <StyledBannerWrapper backgroundColor="#5DE1E6" position="relative" ref={first}>
          <StyledFirstBannerContent>
            <StyledImg
              src={surpriseImage}
              width="500px"
              top="350px"
              left="0px"
              media="none"
              {...animatedItem[4]}></StyledImg>
            <StyledImg src={prideImage} right="15%"></StyledImg>
            <div {...animatedImage}>
              <p>
                사용하지 않는 <strong>외국동전</strong>
              </p>
              <p>
                저렴하게 <strong>교환</strong>가능!
              </p>
              <p>
                <strong>온라인</strong>으로 편리하게 이용 가능!
              </p>
            </div>
          </StyledFirstBannerContent>
          <NavBar>
            <NavBtn idx={1}></NavBtn>
          </NavBar>
        </StyledBannerWrapper>
        <StyledBannerWrapper backgroundColor="#F3F4F9" position="relative" ref={second}>
          <StyledSecondBannerContent {...animatedItem[0]}>
            <p>
              <strong>외국동전</strong>의 환율은
              <br />
              지폐와 다릅니다!!
            </p>
            <p>동전은 지폐와 달리 해당국가로 수출하게 되는데</p>
            <p>지폐보다 무거워 항공요금이 발생합니다</p>
            <div
              style={{
                backgroundImage: `url(${percent})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}>
              알고
              <br />
              계셨나요?
            </div>
          </StyledSecondBannerContent>
          <NavBar>
            <NavBtn idx={2}></NavBtn>
          </NavBar>
        </StyledBannerWrapper>
        <StyledBannerWrapper position="relative" ref={third}>
          <StyledThirdBannerContent {...animatedItem[1]}>
            <strong>{date} 환율</strong>
            <br />
            <CountryStyledContent>
              <img src={usa}></img>
              <p>1 USD: {Math.ceil(USD).toLocaleString('ko-KR')} 원</p>
            </CountryStyledContent>
            <CountryStyledContent>
              <img src={japan}></img>
              <p>100 JPY: {Math.ceil(JPY * 100).toLocaleString('ko-KR')} 원</p>
            </CountryStyledContent>
            <CountryStyledContent>
              <img src={china}></img>
              <p>1 CNY: {Math.ceil(CNY).toLocaleString('ko-KR')} 원</p>
            </CountryStyledContent>
            <CountryStyledContent>
              <img src={eu}></img>
              <p>1 EUR: {Math.ceil(EUR).toLocaleString('ko-KR')} 원</p>
            </CountryStyledContent>
          </StyledThirdBannerContent>
          <ThirdBannerStrong>
            유저간의 거래를 통해 <strong>저렴하게</strong> 외화를 구매할 수 있어요
          </ThirdBannerStrong>
          <NavBar>
            <NavBtn idx={3}></NavBtn>
          </NavBar>
        </StyledBannerWrapper>
        <StyledBannerWrapper backgroundColor="#CCF2F4" position="relative" ref={fourth}>
          <StyledContentWrapper>
            <StyledStepDiv>
              <StyledStepImg src={firstStep}></StyledStepImg>
              <span>1. 동전 사진 찍기</span>
            </StyledStepDiv>
            <StyledStepDiv>
              <StyledStepImg src={secondStep}></StyledStepImg>
              <span>2. 동전 사진 업로드</span>
            </StyledStepDiv>
            <StyledStepDiv>
              <StyledStepImg src={thirdStep}></StyledStepImg>
              <span>3. 동전 개수 확인 및 금액 확인</span>
            </StyledStepDiv>
            <StyledStepDiv>
              <StyledStepImg src={fourthStep}></StyledStepImg>
              <span>4. 배송 관련 정보 입력</span>
            </StyledStepDiv>
          </StyledContentWrapper>
          <StyledContentWrapper>
            <StyledCommentDiv>
              <p>1분 안에 동전 거래하기</p>
              <p>누구나 쉽고 간편하게 4단계로 간편하게 </p>
              <p>판매해보세요! 동전과 사진만 있으면 됩니다</p>
              <p>구매 또한 쉽고 빠르게!!</p>
            </StyledCommentDiv>
            <Link to={ROUTE.BUY}>
              <StyledBtn color="#db186d">구매하기</StyledBtn>
            </Link>
            <Link to={ROUTE.SELL}>
              <StyledBtn>판매하기</StyledBtn>
            </Link>
          </StyledContentWrapper>
          <NavBar>
            <NavBtn idx={4}></NavBtn>
          </NavBar>
        </StyledBannerWrapper>

        <StyledBannerWrapper backgroundColor="#E5E8F6" position="relative" ref={fifth}>
          <LastStyledContent>
            <p>함께하는 사람들</p>
            <div>
              <LogoImage src={elice}></LogoImage>
              <LogoImage src={cocoa}></LogoImage>
              <LogoImage src={mever}></LogoImage>
              <LogoImage src={tasss}></LogoImage>
            </div>
          </LastStyledContent>
          <NavBar>
            <NavBtn idx={5}></NavBtn>
          </NavBar>
        </StyledBannerWrapper>
      </StyledMain>
      <Footer></Footer>
    </>
  );
}

export default Main;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: calc(100vh - 200px);
  min-width: 600px;

  @media (max-width: 700px) {
    min-width: 440px;
  }
  @media (max-width: 450px) {
    min-width: 400px;
  }
  @media (max-width: 400px) {
    min-width: 390px;
  }
`;

const StyledBannerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 700px;
  background-color: ${(props) => props.backgroundColor || 'white'};
  position: ${(props) => props.position || null};

  @media screen {
    flex-wrap: wrap;
  }

  @media (max-width: 700px) {
    height: 600px;
  }
`;

const StyledFirstBannerContent = styled.div`
  display: flex;
  justify-content: center;
  line-height: 60px;
  width: 75%;
  height: 75%;
  position: relative;

  & div {
    text-align: center;
    width: 650px;
    margin-right: 100px;
    padding: 20px;
    border-radius: 30px;
    background-color: white;
    position: absolute;
  }

  &:after {
    border-top: 50px solid white;
    border-left: 60px solid transparent;
    content: '';
    top: 230px;
    right: 35%;
    position: absolute;
  }

  & p {
    color: black;
    font-size: 35px;
    font-weight: bold;
  }

  & strong {
    color: #2ac1bc;
    font-size: 50px;
  }

  @media (max-width: 1000px) {
    line-height: 30px;
    & div {
      width: 100%;
      margin-right: 0px;
      top: 30px;
    }

    &:after {
      top: 160px;
    }

    & p {
      font-size: 25px;
    }

    & strong {
      font-size: 35px;
    }
  }

  @media (max-width: 800px) {
    line-height: 30px;
    & div {
      width: 100%;
      margin-right: 0px;
      top: 30px;
    }

    &:after {
      top: 170px;
    }

    & p {
      font-size: 17px;
    }

    & strong {
      font-size: 30px;
    }
  }
`;

const StyledSecondBannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 60px;
  width: 100%;
  height: 75%;

  & p:first-child {
    font-size: 50px;
    line-height: 70px;
    margin-bottom: 30px;
    font-weight: bold;
  }

  & p {
    font-size: 30px;
    text-align: center;
    line-height: 50px;
    color: black;
    margin-left: 30%;
  }

  & strong {
    color: #2ac1bc;
  }

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 100px;
    line-height: 125%;
    width: 600px;
    height: 500px;
    font-weight: bold;
    position: absolute;
    text-align: center;
    left: 10%;
  }

  @media (max-width: 1000px) {
    & p:first-child {
      font-size: 35px;
    }
    & p {
      margin-left: 0px;
      font-size: 20px;
      position: relative;
      top: 150px;
    }
    & div {
      width: 300px;
      height: 200px;
      font-size: 40px;
      top: 0%;
      left: 50%;
      transform: translate(-50%, 0%);
    }

    @media (max-width: 600px) {
      & p {
        font-size: 15px;
      }
    }
  }
`;

const StyledImg = styled.img`
  width: ${(props) => props.width || '500px'};
  top: ${(props) => props.top || '202px'};
  left: ${(props) => props.left || null};
  right: ${(props) => props.right || null};
  position: absolute;

  @media (max-width: 1000px) {
    display: ${(props) => props.media || null};
    right: 10%;
    top: 40%;
    position: absolute;
  }

  @media (max-width: 600px) {
    display: ${(props) => props.media || null};
    max-width: 350px;
    right: -10%;
    top: 50%;
    position: absolute;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  width: 500px;
  justify-content: center;
  flex-wrap: wrap;

  & + & {
    margin-left: 70px;
  }

  @media (max-width: 1100px) {
    & + & {
      margin-left: 0;
    }
    width: 500px;
  }

  @media (max-width: 600px) {
    width: 300px;
  }
`;

const StyledStepDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  box-sizing: border-box;
  width: 230px;
  background-color: white;
  border-radius: 20px;
  height: 200px;

  @media (max-width: 600px) {
    width: 120px;
    height: 120px;

    & span {
      font-size: 10px;
      text-align: center;
    }
  }
`;

const StyledStepImg = styled.img`
  width: 130px;
  height: 120px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    width: 50px;
    height: 60px;
  }
`;

const StyledCommentDiv = styled.div`
  & p:first-child {
    line-height: 40px;
    font-size: 40px;
    margin-bottom: 30px;
    font-weight: bold;
  }

  & p {
    font-size: 23px;
    text-align: center;
    line-height: 30px;
    color: black;
  }

  @media (max-width: 600px) {
    & p:first-child {
      font-size: 22px;
      margin-bottom: 10px;
      font-weight: bold;
    }

    & p {
      font-size: 15px;
      text-align: center;
      line-height: 30px;
    }
  }
`;

const StyledBtn = styled.button`
  padding: 5px;
  width: 200px;
  margin: 20px;
  font-size: 20px;
  cursor: pointer;
  border: none;
  border-radius: 20px;
  color: white;
  background-color: ${(props) => props.color || '#185adb'};

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const LogoImage = styled.div`
  width: 300px;
  height: 100px;
  margin: 30px;
  background-image: url(${(props) => props.src || null});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  animation: 'Bounce' 1s ease infinite;
  @keyframes Bounce {
    from,
    20%,
    53%,
    80%,
    to {
      transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
      transform: translate3d(0, -30px, 0);
    }

    70% {
      transform: translate3d(0, -15px, 0);
    }

    90% {
      transform: translate3d(0, -4px, 0);
    }
  }

  @media (max-width: 1000px) {
    height: 50px;
  }
`;

const StyledThirdBannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  line-height: 50px;
  position: absolute;
  top: 10%;

  & strong {
    font-size: 50px;
  }

  @media (max-width: 800px) {
    & strong {
      font-size: 30px;
    }
  }
`;

const CountryStyledContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;

  & img {
    width: 70px;
    margin-right: 20px;
  }

  & p {
    font-size: 30px;
    font-weight: bold;
  }
`;

const ThirdBannerStrong = styled.p`
  font-size: 50px;
  font-weight: bold;
  position: relative;
  top: 37.5%;

  animation: 'Bounce' 1s ease infinite;
  @keyframes Bounce {
    from,
    20%,
    53%,
    80%,
    to {
      transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
      transform: translate3d(0, -30px, 0);
    }

    70% {
      transform: translate3d(0, -15px, 0);
    }

    90% {
      transform: translate3d(0, -4px, 0);
    }
  }

  & strong {
    font-size: 70px;
    color: #2ac1bc;
  }

  @media (max-width: 1400px) {
    font-size: 25px;

    & strong {
      font-size: 45px;
    }
  }

  @media (max-width: 800px) {
    font-size: 20px;
    top: 40%;

    & strong {
      font-size: 18px;
    }
  }
  @media (max-width: 700px) {
    top: 45%;
  }
  @media (max-width: 600px) {
    font-size: 12px;
    top: 45%;

    & strong {
      font-size: 18px;
    }
  }
`;

const LastStyledContent = styled.div`
  width: 70%;
  height: 50%;
  text-align: center;

  & p {
    font-size: 100px;
    font-weight: bold;
    top: 0px;
    color: black;
  }

  & div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
    top: 50%;
  }

  @media (max-width: 1000px) {
    height: 60%;
    & p {
      font-size: 50px;
    }

    & div {
      flex-direction: column;
      align-items: center;
      top: 10%;
    }
  }

  @media (max-width: 600px) {
    & p {
      font-size: 30px;
    }
  }
`;

const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 5%;

  & div {
    margin: 10px;
    border: 2px solid blue;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
  }

  & div:hover {
    background-color: #4b89dc;
  }

  @media (max-width: 600px) {
    right: 0%;
    & div {
      width: 10px;
      height: 10px;
    }
  }
`;
