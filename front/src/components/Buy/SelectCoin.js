import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import * as Api from 'api/api';

import japan from 'assets/images/japan.png';
import china from 'assets/images/china.png';
import usa from 'assets/images/usa.jpg';
import SelectCoinCount from './SelectCoinCount';

function SelectCoin({ currentStep, setCurrentStep }) {
  const navigate = useNavigate();
  const [isClick, setIsClick] = useState(false);
  const [selectNation, setSelectNation] = useState('');
  const [coinStock, setCoinStock] = useState();

  const handleClick = (e) => {
    if (selectNation.length === 0) {
      setSelectNation(e.target.id);
      setIsClick(true);
    } else {
      setSelectNation('');
      setIsClick(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(
          `countries/currencyType?countryCode=${selectNation}`
        );
        setCoinStock(response.data);
      } catch (err) {
        console.log(err);
        alert('환율정보를 불러오지 못했습니다.');
      }
    };
    if (selectNation.length !== 0 && selectNation !== 'KRW') {
      fetchData();
    }
  }, [selectNation, isClick, navigate]);

  return (
    <StyledWrapper>
      <StyledDiv>
        <StyledSelectWrapper isClick={isClick}>
          {selectNation === 'JPY' || selectNation.length === 0 ? (
            <StyeldSelectContent id="JPY" onClick={handleClick}>
              <StyledImg src={japan}></StyledImg>
              <span>일본</span>
            </StyeldSelectContent>
          ) : null}
          {selectNation === 'CNY' || selectNation.length === 0 ? (
            <StyeldSelectContent id="CNY" onClick={handleClick}>
              <StyledImg src={china}></StyledImg>
              <span>중국</span>
            </StyeldSelectContent>
          ) : null}
          {selectNation === 'USD' || selectNation.length === 0 ? (
            <StyeldSelectContent id="USD" onClick={handleClick}>
              <StyledImg src={usa}></StyledImg>
              <span>미국</span>
            </StyeldSelectContent>
          ) : null}
        </StyledSelectWrapper>
      </StyledDiv>

      <SelectCoinCount
        selectNation={selectNation}
        coinStock={coinStock}
        setCoinStock={setCoinStock}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}></SelectCoinCount>
    </StyledWrapper>
  );
}

export default SelectCoin;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 1080px;

  @media (max-width: 1097px) {
    width: 600px;
    flex-direction: column;
  }
  @media (max-width: 620px) {
    width: 500px;
  }

  @media (max-width: 500px) {
    width: 400px;
  }
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  @media (max-width: 1097px) {
    width: 500px;
  }
  @media (max-width: 500px) {
    width: 400px;
  }
`;

const StyledSelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border: 10px solid rgba(42, 193, 188, 0.5);
  margin: 10px 20px;
  border-radius: 15px;
  width: 300px;
  height: 320px;
  @media (max-width: 1097px) {
    width: 430px;
  }
  @media (max-width: 500px) {
    width: 310px;
  }
`;

const StyeldSelectContent = styled.div`
  width: 110px;
  height: 120px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  & span {
    z-index: -1;
  }
`;

const StyledImg = styled.img`
  width: 55px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 0px 1px;
  margin-right: 20px;
  z-index: -1;
`;
