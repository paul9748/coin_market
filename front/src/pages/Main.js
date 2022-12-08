import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';
import ROUTE from 'utils/ROUTE';

import firstStep from 'assets/images/capture_image_color.png';
import secondStep from 'assets/images/upload_image_black.png';
import thirdStep from 'assets/images/coinCheck_image_color.png';
import fourthStep from 'assets/images/shipping_image_blue.png';
import prideImage from 'assets/images/pride_image.png';
import surpriseImage from 'assets/images/surprise_image.png';

function Main() {
  return (
    <>
      <Header></Header>
      <StyledMain>
        <StyledBannerWrapper>
          <StyledFirstBannerContent>
            <p>사용하지 않는 동전 간편하게 교환가능!</p>
            <p>온라인으로 편리하게 이용 가능!</p>
            <StyledImg src={prideImage}></StyledImg>
          </StyledFirstBannerContent>
        </StyledBannerWrapper>
        <StyledBannerWrapper>
          <StyledSecondBannerContent>
            <StyledImg src={surpriseImage}></StyledImg>
          </StyledSecondBannerContent>
        </StyledBannerWrapper>
        <StyledBannerWrapper></StyledBannerWrapper>
        <StyledBannerWrapper>
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
              <p>1분 안에 동전 판매하기</p>
              <p>
                누구나 쉽고 간편하게 4단계로 간편하게 판매해보세요! 동전과 사진만 있으면
                됩니다
              </p>
            </StyledCommentDiv>
            <Link to={ROUTE.SELL}>
              <StyledBtn>판매하기</StyledBtn>
            </Link>
          </StyledContentWrapper>
        </StyledBannerWrapper>

        <StyledBannerWrapper></StyledBannerWrapper>
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

  @media (max-width: 600px) {
    min-width: 440px;
  }
`;

const StyledBannerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 700px;
  background-color: #2ac1bc;

  @media screen {
    flex-wrap: wrap;
  }

  @media (max-width: 600px) {
    height: 500px;
  }
`;

const StyledFirstBannerContent = styled.div`
  line-height: 50px;
  & p:first-child {
    font-weight: bold;
    font-size: 33px;
  }
  & p {
    color: white;
    font-size: 30px;
  }

  @media (max-width: 600px) {
    line-height: 30px;
    & p:first-child {
      font-size: 23px;
    }
    & p {
      font-size: 15px;
    }
  }
`;

const StyledSecondBannerContent = styled.div``;

const StyledImg = styled.img`
  width: 400px;
  box-shadow: 23px 16px 23px -20px rgba(0, 0, 0, 0.3);
  margin-left: 220px;

  @media (max-width: 600px) {
    width: 340px;
    margin-left: 80px;
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
    font-size: 40px;
    margin-bottom: 30px;
    font-weight: bold;
  }

  & p {
    font-size: 23px;
    text-align: center;
    line-height: 30px;
    color: white;
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
  margin-top: 20px;
  font-size: 20px;
  cursor: pointer;
  border: none;
  border-radius: 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
