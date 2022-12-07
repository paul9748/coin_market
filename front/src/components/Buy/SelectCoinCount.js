import japan100_f from 'assets/images/japan100_f.png';
import japan500_f from 'assets/images/japan500_f.png';
import china1_f from 'assets/images/china1_f.png';
import usa10_f from 'assets/images/usa10_f.png';
import usa25_f from 'assets/images/usa25_f.png';
import korea100_f from 'assets/images/korea100_f.png';
import korea500_f from 'assets/images/korea500_f.png';
import styled from 'styled-components';
import { useState } from 'react';

import Test from './test';

function SelectCoinCount(props) {
  const nation = {
    JPY: { image: [japan100_f, japan500_f], name: ['일본100엔', '일본500엔'] },
    CNY: { image: [china1_f], name: ['중국1위안'] },
    USD: { image: [usa10_f, usa25_f], name: ['미국10센트', '미국25센트'] },
    KRW: { image: [korea100_f, korea500_f], name: ['한국100원', '한국500원'] },
  };

  const initialValue = { Nation: props.selectNation, firstCoin: 0, secondCoin: 0 };
  const [buyCount, setBuyCount] = useState(initialValue);

  const [buyCoinList, setBuyCoinList] = useState([]);
  const [buyCoin, setBuyCoin] = useState(initialValue);

  const handleChange = (e) => {
    const newBuyCount = { ...buyCount };

    const COIN_ORDER = e.target.name === 'firstCoin' ? 0 : 1;

    if (e.target.value < 0) {
      newBuyCount[e.target.name] = 0;
      return setBuyCount(newBuyCount);
    }
    if (props.coinStock?.[COIN_ORDER]?.stockAmount >= e.target.value) {
      newBuyCount[e.target.name] = e.target.value;
      return setBuyCount(newBuyCount);
    } else {
      newBuyCount[e.target.name] = props.coinStock?.[COIN_ORDER]?.stockAmount || 0;
      return setBuyCount(newBuyCount);
    }
  };

  const addCoin = () => {
    const newBuyCoin = { ...buyCoin };
    newBuyCoin['Nation'] = props.selectNation;
    newBuyCoin['firstCoin'] = buyCount?.firstCoin;
    newBuyCoin['secondCoin'] = buyCount?.secondCoin;
    setBuyCoin(newBuyCoin);

    const newBuyCoinList = [...buyCoinList];

    newBuyCoinList.push(buyCoin);

    setBuyCount(initialValue);

    return setBuyCoinList(newBuyCoinList);
  };

  return (
    <>
      {props.selectNation.length === 0 ? null : (
        <StyledWrapper>
          <StyledContentWrapper>
            <StyledContent>
              <StyledImg src={nation[props.selectNation].image[0]}></StyledImg>
              <span>{nation[props.selectNation].name[0]}</span>
            </StyledContent>
            <StyledContent>
              <span>재고수량</span>
              <span>{props.coinStock?.[0]?.stockAmount || 0}개</span>
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
                  max={props.coinStock?.[0]?.stockAmount || 0}></StyledInput>
                <span> 개</span>
              </p>
            </StyledContent>
          </StyledContentWrapper>
          {props.selectNation === 'CNY' ? null : (
            <StyledContentWrapper>
              <StyledContent>
                <StyledImg src={nation[props.selectNation].image[1]}></StyledImg>
                <span>{nation[props.selectNation].name[1]}</span>
              </StyledContent>
              <StyledContent>
                <span>재고수량</span>
                <span>{props.coinStock?.[1]?.stockAmount || 0}개</span>
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
                    max={props.coinStock?.[1]?.stockAmount || 0}></StyledInput>
                  <span> 개</span>
                </p>
              </StyledContent>
            </StyledContentWrapper>
          )}
          <StyledBtn onClick={(e) => addCoin(e)}>+</StyledBtn>
        </StyledWrapper>
      )}
      <StyledWrapper>
        <Test buyCoinList={buyCoinList}></Test>
      </StyledWrapper>
    </>
  );
}

export default SelectCoinCount;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  min-height: 320px;
  border: 10px solid rgb(42, 193, 188);
  border-radius: 15px;
  @media (max-width: 600px) {
    width: 400px;
  }

  & + & {
    margin: 15px;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  width: 320px;
  height: 70px;
  margin-top: 10px;
  justify-content: space-evenly;
  align-items: flex-start;
  @media (max-width: 600px) {
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

const StyledBtn = styled.button`
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
`;

const StyledImg = styled.img`
  width: 50px;
`;
