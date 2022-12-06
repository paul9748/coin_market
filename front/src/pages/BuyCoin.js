import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';

import styled from 'styled-components';

import Payment from 'components/Buy/Payment';

import { useState } from 'react';
import StartBuy from 'components/Buy/StartBuy';
import SelectCoin from 'components/Buy/SelectCoin';

function BuyCoin() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <Header backColor="#2AC1BC" logoImage="white" color="white"></Header>
      <StyledMain>
        {currentStep === 0 ? <StartBuy></StartBuy> : null}
        {currentStep === 1 ? <SelectCoin></SelectCoin> : null}
        {currentStep === 2 ? <Payment></Payment> : null}
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
            {currentStep === 0 ? '구매하기' : '다음'}
          </StyledBtn>
        </StyledBtnWrapper>
      </StyledMain>
      <Footer></Footer>
    </>
  );
}

export default BuyCoin;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: calc(100vh - 200px);
  min-width: 600px;

  @media (max-width: 600px) {
    min-width: 300px;
  }
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
