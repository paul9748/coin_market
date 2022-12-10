import JPY100 from 'assets/images/japan100_f.png';
import JPY500 from 'assets/images/japan500_f.png';
import CNY1 from 'assets/images/china1_f.png';
import USD10 from 'assets/images/usa10_f.png';
import USD25 from 'assets/images/usa25_f.png';
import KRW100 from 'assets/images/korea100_f.png';
import KRW500 from 'assets/images/korea500_f.png';

import styled from 'styled-components';

function BuyCoinResult({ buyCoinList, setBuyCoinList, coinStock, setCoinStock }) {
  const deleteCoin = (idx) => {
    const newCoinStock = [];
    newCoinStock.push({
      stockAmount:
        parseInt(coinStock[0].stockAmount) + parseInt(buyCoinList[idx].firstCoin),
    });
    newCoinStock.push({
      stockAmount:
        parseInt(coinStock[1].stockAmount) + parseInt(buyCoinList[idx].secondCoin),
    });
    setCoinStock(newCoinStock);

    setBuyCoinList((preState) => preState.filter((_, index) => index !== idx));
  };

  return (
    <>
      {buyCoinList.map((el, idx) => {
        return (
          <StyledDiv key={idx}>
            {el.firstCoin ? (
              <>
                {el.selectNation === 'JPY' ? (
                  <StyledContent>
                    <StyledImg src={JPY100}></StyledImg>
                    <div>일본100엔</div>
                  </StyledContent>
                ) : null}
                {el.selectNation === 'CNY' ? (
                  <StyledContent>
                    <StyledImg src={CNY1}></StyledImg>
                    <div>중국1위안</div>
                  </StyledContent>
                ) : null}
                {el.selectNation === 'USD' ? (
                  <StyledContent>
                    <StyledImg src={USD10}></StyledImg>
                    <div>미국10센트</div>
                  </StyledContent>
                ) : null}
                {el.selectNation === 'KRW' ? (
                  <StyledContent>
                    <StyledImg src={KRW100}></StyledImg>
                    <div>한국100원</div>
                  </StyledContent>
                ) : null}
                <StyledContent>
                  <span>선택수량</span>
                  <span>{el.firstCoin}개</span>
                </StyledContent>
              </>
            ) : null}
            {el.secondCoin ? (
              <>
                {el.selectNation === 'JPY' ? (
                  <StyledContent>
                    <StyledImg src={JPY500}></StyledImg>
                    <div>일본500엔</div>
                  </StyledContent>
                ) : null}
                {el.selectNation === 'USD' ? (
                  <StyledContent>
                    <StyledImg src={USD25}></StyledImg>
                    <div>미국25센트</div>
                  </StyledContent>
                ) : null}
                {el.selectNation === 'KRW' ? (
                  <StyledContent>
                    <StyledImg src={KRW500}></StyledImg>
                    <div>한국500원</div>
                  </StyledContent>
                ) : null}
                <StyledContent>
                  <span>선택수량</span>
                  <span>{el.secondCoin}개</span>
                </StyledContent>
              </>
            ) : null}
            <StyledBtn onClick={() => deleteCoin(idx)}>-</StyledBtn>
          </StyledDiv>
        );
      })}
    </>
  );
}

export default BuyCoinResult;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  width: 280px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.07);

  & + & {
    margin-top: 5px;
  }

  @media (max-width: 600px) {
    width: 330px;
  }

  @media (max-width: 1079px) {
    width: 400px;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

const StyledBtn = styled.button`
  width: 33px;
  height: 33px;
  font-size: 34px;
  line-height: 0;
  border: none;
  border-radius: 10px;
  padding: 10px 11px 13px 10px;
  background-color: rgba(42, 193, 188, 0.5);
  cursor: pointer;

  &:hover {
    background-color: rgba(42, 193, 188, 0.8);
  }
`;

const StyledImg = styled.img`
  width: 35px;
`;

const StyledContent = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: center;
  & > div {
    font-size: 12px;
  }
`;
