import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';

import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import Payment from 'components/Buy/Payment';

import { useState, useEffect } from 'react';
import StartBuy from 'components/Buy/StartBuy';
import SelectCoin from 'components/Buy/SelectCoin';

import ROUTE from 'utils/ROUTE';

function BuyCoin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('ACCESS_TOKEN')) {
      alert('로그인이 필요합니다.');
      navigate(ROUTE.LOGIN);
    }
  }, [navigate]);

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <Header backColor="#2AC1BC" logoImage="white" color="white"></Header>
      <StyledMain>
        {currentStep === 0 && <StartBuy></StartBuy>}
        {currentStep === 1 && (
          <SelectCoin
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}></SelectCoin>
        )}
        {currentStep === 2 && <Payment></Payment>}

        {currentStep < 1 && (
          <StyledBtnWrapper>
            {currentStep !== 0 && (
              <StyledBtn
                onClick={() => {
                  currentStep > 0 && setCurrentStep((preState) => preState - 1);
                }}>
                이전
              </StyledBtn>
            )}
            <StyledBtn
              onClick={() => {
                currentStep < 3 && setCurrentStep((preState) => preState + 1);
              }}>
              {currentStep === 0 ? '구매하기' : '다음'}
            </StyledBtn>
          </StyledBtnWrapper>
        )}
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
  align-items: center;

  min-height: calc(100vh - 200px);
  min-width: 600px;

  @media (max-width: 600px) {
    min-width: 440px;
  }
  @media (max-width: 450px) {
    min-width: 400px;
  }
  @media (max-width: 400px) {
    min-width: 380px;
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
