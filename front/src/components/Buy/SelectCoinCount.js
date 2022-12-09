import japan100_f from 'assets/images/japan100_f.png';
import japan500_f from 'assets/images/japan500_f.png';
import china1_f from 'assets/images/china1_f.png';
import usa10_f from 'assets/images/usa10_f.png';
import usa25_f from 'assets/images/usa25_f.png';
import korea100_f from 'assets/images/korea100_f.png';
import korea500_f from 'assets/images/korea500_f.png';

import styled from 'styled-components';
import { useState } from 'react';

import { useCoinContext } from 'context/CoinContext';

import BuyCoinResult from './BuyCoinResult';

function SelectCoinCount({
  selectNation,
  coinStock,
  setCoinStock,
  currentStep,
  setCurrentStep,
}) {
  const nation = {
    JPY: { image: [japan100_f, japan500_f], name: ['일본100엔', '일본500엔'] },
    CNY: { image: [china1_f], name: ['중국1위안'] },
    USD: { image: [usa10_f, usa25_f], name: ['미국10센트', '미국25센트'] },
    KRW: { image: [korea100_f, korea500_f], name: ['한국100원', '한국500원'] },
  };

  const { setCoinList } = useCoinContext();

  const initialValue = { selectNation, firstCoin: 0, secondCoin: 0 };
  const [buyCount, setBuyCount] = useState(initialValue);

  const [buyCoinList, setBuyCoinList] = useState([]);

  const handleChange = (e) => {
    const newBuyCount = { ...buyCount };

    const { name, value } = e.target;

    const COIN_ORDER = name === 'firstCoin' ? 0 : 1;

    if (value < 0) {
      newBuyCount[name] = 0;
      return setBuyCount(newBuyCount);
    }
    if (coinStock?.[COIN_ORDER]?.stockAmount >= value) {
      newBuyCount[name] = value;
      return setBuyCount(newBuyCount);
    } else {
      newBuyCount[name] = coinStock?.[COIN_ORDER]?.stockAmount || 0;
      return setBuyCount(newBuyCount);
    }
  };

  const addCoin = (e) => {
    e.preventDefault();

    const newBuyCount = {
      ...buyCount,
      selectNation,
      firstCoin: buyCount.firstCoin,
      secondCoin: buyCount.secondCoin,
    };

    setBuyCount(newBuyCount);

    const newCoinStock = [];
    newCoinStock.push({ stockAmount: coinStock[0].stockAmount - newBuyCount.firstCoin });
    newCoinStock.push({ stockAmount: coinStock[1].stockAmount - newBuyCount.secondCoin });

    setCoinStock(newCoinStock);

    const newBuyCoinList = [...buyCoinList];

    if (newBuyCount.firstCoin === 0 && newBuyCount.secondCoin === 0) {
      return;
    }
    newBuyCoinList.push(newBuyCount);
    setBuyCount(initialValue);
    setCoinList(newBuyCoinList);

    return setBuyCoinList(newBuyCoinList);
  };

  return (
    <>
      {selectNation.length === 0 ? null : (
        <StyledWrapper>
          <StyledContentWrapper>
            <StyledContent>
              <StyledImg src={nation[selectNation].image[0]}></StyledImg>
              <span>{nation[selectNation].name[0]}</span>
            </StyledContent>
            <StyledContent>
              <span>재고수량</span>
              <span>{coinStock?.[0]?.stockAmount - buyCount.firstCoin || 0}개</span>
            </StyledContent>
            <StyledContent>
              <span>구매수량</span>
              <p>
                <StyledInput
                  type="number"
                  name="firstCoin"
                  onChange={handleChange}
                  value={buyCount.firstCoin}
                  min="0"
                  max={coinStock?.[0]?.stockAmount || 0}></StyledInput>
                <span> 개</span>
              </p>
            </StyledContent>
          </StyledContentWrapper>
          {selectNation === 'CNY' ? null : (
            <StyledContentWrapper>
              <StyledContent>
                <StyledImg src={nation[selectNation].image[1]}></StyledImg>
                <span>{nation[selectNation].name[1]}</span>
              </StyledContent>
              <StyledContent>
                <span>재고수량</span>
                <span>{coinStock?.[1]?.stockAmount - buyCount.secondCoin || 0}개</span>
              </StyledContent>
              <StyledContent>
                <span>구매수량</span>
                <p>
                  <StyledInput
                    type="number"
                    name="secondCoin"
                    onChange={handleChange}
                    value={buyCount.secondCoin}
                    min="0"
                    max={coinStock?.[1]?.stockAmount || 0}></StyledInput>
                  <span> 개</span>
                </p>
              </StyledContent>
            </StyledContentWrapper>
          )}
          <StyledAddBtn onClick={addCoin}>+</StyledAddBtn>
        </StyledWrapper>
      )}
      <StyledWrapper>
        <BuyCoinResult
          buyCoinList={buyCoinList}
          coinStock={coinStock}
          setBuyCoinList={setBuyCoinList}
          setCoinStock={setCoinStock}></BuyCoinResult>
      </StyledWrapper>
      <StyledBtnWrapper>
        {currentStep === 0 ? null : (
          <StyledBtn
            onClick={() => {
              setCurrentStep((preState) => preState - 1);
            }}>
            이전
          </StyledBtn>
        )}
        <StyledBtn
          disabled={buyCoinList.length <= 0}
          onClick={() => {
            currentStep < 5 && setCurrentStep((preState) => preState + 1);
          }}>
          다음
        </StyledBtn>
      </StyledBtnWrapper>
    </>
  );
}

export default SelectCoinCount;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  flex-wrap: wrap;
  min-height: 320px;
  border: 10px solid rgb(42, 193, 188);
  border-radius: 15px;

  & + & {
    margin: 15px;
  }
  @media (max-width: 1097px) {
    width: 430px;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  width: 320px;
  height: 70px;
  margin-top: 10px;
  justify-content: space-evenly;
  align-items: flex-start;
  @media (max-width: 1097px) {
    width: 400px;
  }
`;

const StyledContent = styled.div`
  display: flex;
  height: 60px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 50px;
`;

const StyledAddBtn = styled.button`
  margin-top: 50px;
  width: 50px;
  height: 50px;
  font-size: 30px;
  cursor: pointer;
  border-radius: 10px;
  border: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &:active {
    position: relative;
    top: 4px;
  }
`;

const StyledImg = styled.img`
  width: 50px;
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
  width: 600px;
  justify-content: space-between;
  margin: 40px 0;
  @media (max-width: 620px) {
    width: 400px;
  }
`;
