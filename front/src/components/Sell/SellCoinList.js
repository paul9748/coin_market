import styled from 'styled-components';

import { useState } from 'react';

import japan from 'assets/images/japan.png';
import china from 'assets/images/china.png';
import usa from 'assets/images/usa.jpg';
import useRate from 'hooks/useRate';
import AddCoinModal from './AddCoinModal';

function SellCoinList({ coinData, setCoinData }) {
  const { jpyRate, cnyRate, usdRate } = useRate();
  const [isModal, setIsModal] = useState(false);

  let jpyResult = 0;
  let cnyResult = 0;
  let usdResult = 0;

  coinData?.JPY?.map((el) => {
    if (el.coinId === process.env.REACT_APP_JPY100) {
      jpyResult += 100 * el.dealAmount;
    }
    if (el.coinId === process.env.REACT_APP_JPY500) {
      jpyResult += 500 * el.dealAmount;
    }
  });

  coinData?.CNY?.map((el) => {
    if (el.coinId === process.env.REACT_APP_CNY1) {
      cnyResult += el.dealAmount;
    }
  });

  coinData?.USD?.map((el) => {
    if (el.coinId === process.env.REACT_APP_USD10) {
      usdResult += 10 * el.dealAmount;
    }
    if (el.coinId === process.env.REACT_APP_USD25) {
      usdResult += 25 * el.dealAmount;
    }
  });

  const addCoin = (e) => {
    if (e.target.name === 'JPY100') {
      const newCoinData = { ...coinData };
      if (newCoinData.JPY[0].coinId === process.env.REACT_APP_JPY100) {
        newCoinData.JPY[0].dealAmount += 1;
        return setCoinData(newCoinData);
      }
      if (newCoinData.JPY[1].coinId === process.env.REACT_APP_JPY100) {
        newCoinData.JPY[1].dealAmount += 1;
        return setCoinData(newCoinData);
      }
    }
    if (e.target.name === 'JPY500') {
      const newCoinData = { ...coinData };
      if (newCoinData.JPY[0].coinId === process.env.REACT_APP_JPY500) {
        newCoinData.JPY[0].dealAmount += 1;
        return setCoinData(newCoinData);
      }
      if (newCoinData.JPY[1].coinId === process.env.REACT_APP_JPY500) {
        newCoinData.JPY[1].dealAmount += 1;
        return setCoinData(newCoinData);
      }
    }

    if (e.target.name === 'CNY') {
      const newCoinData = { ...coinData };
      newCoinData.CNY[0].dealAmount += 1;
      return setCoinData(newCoinData);
    }

    if (e.target.name === 'USD10') {
      const newCoinData = { ...coinData };
      if (newCoinData.USD[0].coinId === process.env.REACT_APP_USD10) {
        newCoinData.USD[0].dealAmount += 1;
        return setCoinData(newCoinData);
      }
      if (newCoinData.USD[1].coinId === process.env.REACT_APP_USD10) {
        newCoinData.USD[1].dealAmount += 1;
        return setCoinData(newCoinData);
      }
    }
    if (e.target.name === 'USD25') {
      const newCoinData = { ...coinData };
      if (newCoinData.USD[0].coinId === process.env.REACT_APP_USD25) {
        newCoinData.USD[0].dealAmount += 1;
        return setCoinData(newCoinData);
      }
      if (newCoinData.USD[1].coinId === process.env.REACT_APP_USD25) {
        newCoinData.USD[1].dealAmount += 1;
        return setCoinData(newCoinData);
      }
    }
  };

  const removeCoin = (e) => {
    if (e.target.name === 'JPY100') {
      const newCoinData = { ...coinData };
      if (newCoinData.JPY[0].coinId === process.env.REACT_APP_JPY100) {
        if (newCoinData.JPY[0].dealAmount > 0) newCoinData.JPY[0].dealAmount -= 1;
        return setCoinData(newCoinData);
      }
      if (newCoinData.JPY[1].coinId === process.env.REACT_APP_JPY100) {
        if (newCoinData.JPY[1].dealAmount > 0) newCoinData.JPY[1].dealAmount -= 1;
        return setCoinData(newCoinData);
      }
    }
    if (e.target.name === 'JPY500') {
      const newCoinData = { ...coinData };
      if (newCoinData.JPY[0].coinId === process.env.REACT_APP_JPY500) {
        if (newCoinData.JPY[0].dealAmount > 0) newCoinData.JPY[0].dealAmount -= 1;
        return setCoinData(newCoinData);
      }
      if (newCoinData.JPY[1].coinId === process.env.REACT_APP_JPY500) {
        if (newCoinData.JPY[1].dealAmount > 0) newCoinData.JPY[1].dealAmount -= 1;
        return setCoinData(newCoinData);
      }
    }

    if (e.target.name === 'CNY') {
      const newCoinData = { ...coinData };
      if (newCoinData.CNY[0].dealAmount > 0) newCoinData.CNY[0].dealAmount -= 1;
      return setCoinData(newCoinData);
    }

    if (e.target.name === 'USD10') {
      const newCoinData = { ...coinData };
      if (newCoinData.USD[0].coinId === process.env.REACT_APP_USD10) {
        if (newCoinData.USD[0].dealAmount > 0) newCoinData.USD[0].dealAmount -= 1;
        return setCoinData(newCoinData);
      }
      if (newCoinData.USD[1].coinId === process.env.REACT_APP_USD10) {
        if (newCoinData.USD[1].dealAmount > 0) newCoinData.USD[1].dealAmount -= 1;
        return setCoinData(newCoinData);
      }
    }
    if (e.target.name === 'USD25') {
      const newCoinData = { ...coinData };

      if (newCoinData.USD[0].coinId === process.env.REACT_APP_USD25) {
        newCoinData.USD[0].dealAmount > 0 && (newCoinData.USD[0].dealAmount -= 1);
        return setCoinData(newCoinData);
      }
      if (newCoinData.USD[1].coinId === process.env.REACT_APP_USD25) {
        newCoinData.USD[1].dealAmount > 0 && (newCoinData.USD[1].dealAmount -= 1);
        return setCoinData(newCoinData);
      }
    }
  };

  return (
    <StyledWrapper>
      {isModal && (
        <AddCoinModal
          setIsModal={setIsModal}
          setCoinData={setCoinData}
          coinData={coinData}></AddCoinModal>
      )}
      {coinData?.JPY && (
        <StyledNationWrapper>
          <div>할인환율(기준환율 * 0.7) : {jpyRate?.[0].basePrice} KRW/JPY100</div>
          <StyledNationContentWrapper>
            <StyledCoinListTitle>
              <StyledImg src={japan} />
              <div>일본 JPY</div>
              <div>
                합계 : {jpyResult.toLocaleString()}엔
                <br />
                {Math.floor((jpyResult / 100) * jpyRate?.[0].basePrice).toLocaleString()}
                원
              </div>
            </StyledCoinListTitle>
            <StyledCoinListContent>
              {coinData?.JPY[0]?.coinId === process.env.REACT_APP_JPY100 && (
                <StyledCoin>
                  <StyledCoinImg src="JPY100.png" />
                  <div>
                    <div>100엔 x {coinData?.JPY[0]?.dealAmount}개 =</div>
                    <div>
                      {Math.floor(
                        jpyRate?.[0].basePrice * coinData?.JPY[0]?.dealAmount
                      ).toLocaleString()}
                      원
                    </div>
                  </div>
                  <div>
                    <StyledCountBtn name="JPY100" onClick={addCoin}>
                      +
                    </StyledCountBtn>
                    <StyledCountBtn name="JPY100" onClick={removeCoin}>
                      -
                    </StyledCountBtn>
                  </div>
                </StyledCoin>
              )}
              {coinData?.JPY?.[1]?.coinId === process.env.REACT_APP_JPY100 && (
                <StyledCoin>
                  <StyledCoinImg src="/JPY100.png" />
                  <div>
                    <div>100엔 x {coinData?.JPY[1]?.dealAmount}개 =</div>
                    <div>
                      {Math.floor(
                        jpyRate?.[0].basePrice * 5 * coinData?.JPY[1]?.dealAmount
                      ).toLocaleString()}
                      원
                    </div>
                  </div>
                  <div>
                    <StyledCountBtn name="JPY100" onClick={addCoin}>
                      +
                    </StyledCountBtn>
                    <StyledCountBtn name="JPY100" onClick={removeCoin}>
                      -
                    </StyledCountBtn>
                  </div>
                </StyledCoin>
              )}
              {coinData?.JPY[0]?.coinId === process.env.REACT_APP_JPY500 && (
                <StyledCoin>
                  <StyledCoinImg src="/JPY500.png" />
                  <div>
                    <div>500엔 x {coinData?.JPY[0]?.dealAmount}개 =</div>
                    <div>
                      {Math.floor(
                        jpyRate?.[0].basePrice * 5 * coinData?.JPY[0]?.dealAmount
                      ).toLocaleString()}
                      원
                    </div>
                  </div>
                  <div>
                    <StyledCountBtn name="JPY500" onClick={addCoin}>
                      +
                    </StyledCountBtn>
                    <StyledCountBtn name="JPY500" onClick={removeCoin}>
                      -
                    </StyledCountBtn>
                  </div>
                </StyledCoin>
              )}
              {coinData?.JPY?.[1]?.coinId === process.env.REACT_APP_JPY500 && (
                <StyledCoin>
                  <StyledCoinImg src="/JPY500.png" />
                  <div>
                    <div>500엔 x {coinData?.JPY[1]?.dealAmount}개 =</div>
                    <div>
                      {Math.floor(
                        jpyRate?.[0].basePrice * 5 * coinData?.JPY[1]?.dealAmount
                      ).toLocaleString()}
                      원
                    </div>
                  </div>
                  <div>
                    <StyledCountBtn name="JPY500" onClick={addCoin}>
                      +
                    </StyledCountBtn>
                    <StyledCountBtn name="JPY500" onClick={removeCoin}>
                      -
                    </StyledCountBtn>
                  </div>
                </StyledCoin>
              )}
            </StyledCoinListContent>
          </StyledNationContentWrapper>
        </StyledNationWrapper>
      )}
      {coinData?.CNY && (
        <StyledNationWrapper>
          <div>할인환율(기준환율 * 0.7) : {cnyRate?.[0].basePrice} KRW/CNY</div>
          <StyledNationContentWrapper>
            <StyledCoinListTitle>
              <StyledImg src={china} />
              <div>중국 CNY</div>
              <div>
                합계 : {cnyResult}위안
                <br />
                {Math.floor(cnyResult * cnyRate?.[0].basePrice).toLocaleString()}원
              </div>
            </StyledCoinListTitle>
            <StyledCoinListContent>
              <StyledCoin>
                <StyledCoinImg src="CNY1.png" />
                <div>
                  <div>1위안 x {cnyResult}개 =</div>
                  <div>
                    {Math.floor(cnyRate?.[0].basePrice * cnyResult).toLocaleString()}원
                  </div>
                </div>
                <div>
                  <StyledCountBtn name="CNY" onClick={addCoin}>
                    +
                  </StyledCountBtn>
                  <StyledCountBtn name="CNY" onClick={removeCoin}>
                    -
                  </StyledCountBtn>
                </div>
              </StyledCoin>
            </StyledCoinListContent>
          </StyledNationContentWrapper>
        </StyledNationWrapper>
      )}
      {coinData?.USD && (
        <StyledNationWrapper>
          <div>할인환율(기준환율 * 0.7) : {usdRate?.[0].basePrice} KRW/USD</div>
          <StyledNationContentWrapper>
            <StyledCoinListTitle>
              <StyledImg src={usa} />
              <div>미국 USD</div>
              <div>
                합계 : {usdResult / 100}달러
                <br />
                {Math.floor((usdRate?.[0].basePrice * usdResult) / 100).toLocaleString()}
                원
              </div>
            </StyledCoinListTitle>
            <StyledCoinListContent>
              {coinData?.USD[0]?.coinId === process.env.REACT_APP_USD10 && (
                <StyledCoin>
                  <StyledCoinImg src="USD10.png" />
                  <div>
                    <div>10센트 x {coinData?.USD[0]?.dealAmount}개 =</div>
                    <div>
                      {Math.floor(
                        usdRate?.[0].basePrice * coinData?.USD[0]?.dealAmount * 0.1
                      ).toLocaleString()}
                      원
                    </div>
                  </div>
                  <div>
                    <StyledCountBtn name="USD10" onClick={addCoin}>
                      +
                    </StyledCountBtn>
                    <StyledCountBtn name="USD10" onClick={removeCoin}>
                      -
                    </StyledCountBtn>
                  </div>
                </StyledCoin>
              )}
              {coinData?.USD?.[1]?.coinId === process.env.REACT_APP_USD10 && (
                <StyledCoin>
                  <StyledCoinImg src="/USD10.png" />
                  <div>
                    <div>10센트 x {coinData?.USD[1]?.dealAmount}개 =</div>
                    <div>
                      {Math.floor(
                        usdRate?.[0].basePrice * coinData?.USD[1]?.dealAmount * 0.1
                      ).toLocaleString()}
                      원
                    </div>
                  </div>
                  <div>
                    <StyledCountBtn name="USD10" onClick={addCoin}>
                      +
                    </StyledCountBtn>
                    <StyledCountBtn name="USD10" onClick={removeCoin}>
                      -
                    </StyledCountBtn>
                  </div>
                </StyledCoin>
              )}
              {coinData?.USD[0]?.coinId === process.env.REACT_APP_USD25 && (
                <StyledCoin>
                  <StyledCoinImg src="/USD25.png" />
                  <div>
                    <div>25센트 x {coinData?.USD[0]?.dealAmount}개 =</div>
                    <div>
                      {Math.floor(
                        usdRate?.[0].basePrice * coinData?.USD[0].dealAmount * 0.25
                      ).toLocaleString()}
                      원
                    </div>
                  </div>
                  <div>
                    <StyledCountBtn name="USD25" onClick={addCoin}>
                      +
                    </StyledCountBtn>
                    <StyledCountBtn name="USD25" onClick={removeCoin}>
                      -
                    </StyledCountBtn>
                  </div>
                </StyledCoin>
              )}
              {coinData?.USD?.[1]?.coinId === process.env.REACT_APP_USD25 && (
                <StyledCoin>
                  <StyledCoinImg src="/USD25.png" />
                  <div>
                    <div>25센트 x {coinData?.USD[1]?.dealAmount}개 =</div>
                    <div>
                      {Math.floor(
                        usdRate?.[0].basePrice * coinData?.USD[1]?.dealAmount * 0.25
                      ).toLocaleString()}
                      원
                    </div>
                  </div>
                  <div>
                    <StyledCountBtn name="USD25" onClick={addCoin}>
                      +
                    </StyledCountBtn>
                    <StyledCountBtn name="USD25" onClick={removeCoin}>
                      -
                    </StyledCountBtn>
                  </div>
                </StyledCoin>
              )}
            </StyledCoinListContent>
          </StyledNationContentWrapper>
        </StyledNationWrapper>
      )}
      <StyledCoinAddBtn
        onClick={() => {
          setIsModal((preState) => !preState);
        }}>
        동전추가
      </StyledCoinAddBtn>
    </StyledWrapper>
  );
}

export default SellCoinList;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledNationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div:first-child {
    width: 500px;
    margin: 10px 0;
    text-align: right;
    @media (max-width: 600px) {
      width: 400px;
    }
    @media (max-width: 450px) {
      width: 340px;
    }
  }
`;

const StyledNationContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  height: 300px;
  margin-bottom: 30px;
  width: 500px;
  @media (max-width: 600px) {
    width: 400px;
  }
  @media (max-width: 450px) {
    width: 340px;
  }
`;

const StyledCoinListTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  width: 400px;
  padding: 20px;

  @media (max-width: 600px) {
    width: 330px;
  }
  @media (max-width: 450px) {
    width: 300px;
  }
`;

const StyledCoinListContent = styled.div``;

const StyledCoin = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  @media (max-width: 600px) {
    width: 330px;
  }
  @media (max-width: 450px) {
    width: 300px;
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

const StyledCoinImg = styled.img`
  width: 50px;
`;

const StyledCountBtn = styled.button`
  width: 45px;
  height: 40px;
  font-size: 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  background-color: rgba(42, 193, 188, 0.4);

  & + & {
    margin-left: 8px;
  }

  &:hover {
    background-color: rgba(42, 193, 188, 0.7);
  }
`;

const StyledCoinAddBtn = styled.button`
  font-size: 20px;
  width: 150px;
  height: 50px;
  cursor: pointer;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  background-color: rgb(42, 193, 188);

  &:hover {
    background-color: rgba(42, 193, 188, 0.5);
  }
`;
