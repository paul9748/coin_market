import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';

import styled from 'styled-components';

import { useState } from 'react';

import StartSell from 'components/Sell/StartSell';
import UploadImage from 'components/Sell/UploadImage';
import SellStepOne from 'components/Sell/SellStepOne';

function SellCoin() {
  const [currentStep, setCurrentStep] = useState(0);
  const stepComment = [
    '판매하실 동전 사진을 찍어주세요.',
    '사진을 업로드 해주세요.',
    '금액을 확인 해주세요.',
    '동전을 택배로 보내주세요',
  ];

  return (
    <>
      <Header backColor="#2AC1BC" logoImage="white" color="white"></Header>
      <StyledMain>
        {currentStep === 0 || currentStep > 4 ? null : (
          <StyledTitle>
            <TitleLabel>STEP {currentStep}</TitleLabel>
            <TitleContent>{stepComment[currentStep - 1]}</TitleContent>
          </StyledTitle>
        )}
        {currentStep === 0 ? <StartSell></StartSell> : null}
        {currentStep === 1 ? <SellStepOne></SellStepOne> : null}
        {currentStep === 2 ? <UploadImage></UploadImage> : null}
        <StyledBtnWrapper>
          {currentStep === 0 ? null : (
            <StyledBtn
              onClick={() => {
                currentStep > 0 && setCurrentStep((preState) => preState - 1);
              }}>
              이전
            </StyledBtn>
          )}
          <StyledBtn
            onClick={() => {
              currentStep < 5 && setCurrentStep((preState) => preState + 1);
            }}>
            {currentStep === 0 ? '판매하기' : '다음'}
          </StyledBtn>
        </StyledBtnWrapper>
      </StyledMain>
      <Footer></Footer>
    </>
  );
}

export default SellCoin;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: calc(100vh - 200px);
  min-width: 600px;

  @media (max-width: 600px) {
    min-width: 300px;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  margin: 20px auto;
  width: 440px;
`;

const TitleLabel = styled.div`
  position: relative;
  padding: 10px;
  border-radius: 10px;
  font-size: 25px;
  font-weight: bold;
  color: white;
  background-color: #2ac1bc;

  &:after {
    border-top: 15px solid #2ac1bc;
    border-left: 30px solid transparent;
    content: '';
    top: 50px;
    right: 10px;
    position: absolute;
  }
`;

const TitleContent = styled.div`
  background-color: rgba(42, 193, 188, 0.2);
  position: relative;
  top: 40px;
  left: 10px;
  width: 300px;
  line-height: 50px;
  text-indent: 20px;
  font-weight: bold;
`;

const StyledBtn = styled.button`
  width: 100px;
  height: 50px;
  border: 0;
  border-radius: 10px;
  background-color: rgba(42, 193, 188, 0.5);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: rgba(42, 193, 188, 0.3);
  }
`;

const StyledBtnWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;

  margin: 40px 0;
`;
