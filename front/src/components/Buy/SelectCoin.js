import { useEffect, useState } from 'react';

import styled from 'styled-components';

import * as Api from 'api/api';

import japan from 'assets/images/japan.png';
import china from 'assets/images/china.png';
import usa from 'assets/images/usa.jpg';
import korea from 'assets/images/korea.png';

function SelectCoin() {
  const [isClick, setIsClick] = useState(false);
  const [selectNation, setSelectNation] = useState('');
  const [exchangeRate, setExchangeRate] = useState();

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
        const respose = await Api.get(`exchangeRate?countryCode=${selectNation}`);
        setExchangeRate(respose.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (selectNation.length !== 0 && selectNation !== 'korea') {
      fetchData();
    }
  }, [selectNation]);

  return (
    <StyledWrapper>
      <StyledDiv>국가를 선택하세요.</StyledDiv>
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
          {selectNation === 'korea' || selectNation.length === 0 ? (
            <StyeldSelectContent id="korea" onClick={handleClick}>
              <StyledImg src={korea}></StyledImg>
              <span>한국</span>
            </StyeldSelectContent>
          ) : null}
        </StyledSelectWrapper>
      </StyledDiv>
    </StyledWrapper>
  );
}

export default SelectCoin;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
  flex-wrap: wrap;

  @media (max-width: 820px) {
    flex-direction: column;
  }
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
`;

const StyledSelectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border: 10px solid rgba(42, 193, 188, 0.5);
  margin: 10px 20px;
  border-radius: 15px;
  width: 340px;
  height: 320px;
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
