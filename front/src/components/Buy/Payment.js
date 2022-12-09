import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useCoinContext } from 'context/CoinContext';

import * as Api from 'api/api';

import useRate from 'hooks/useRate';
import PostCode from 'components/Buy/PostCode';
import PayButton from './PayButton';

const Payment = () => {
  const { coinList } = useCoinContext();
  const { jpyRate, cnyRate, usdRate } = useRate();

  const [userInfo, setUserInfo] = useState({
    buyer_name: '',
    buyer_tel: '',
    buyer_addr: '',
    detailAddress: '',
    buyer_postcode: '',
  });

  console.log(process.env.REACT_APP_JPY100);
  console.log(coinList);
  console.log(jpyRate, cnyRate, usdRate);
  console.log(userInfo);

  return (
    <StyledLayout>
      <StyledWrapper>
        <StyledPageTitle>주문결제</StyledPageTitle>
        <StyledAddressWrapper>
          <StyledContentTitle>배송정보</StyledContentTitle>
          <PostCode userInfo={userInfo} setUserInfo={setUserInfo}></PostCode>
        </StyledAddressWrapper>
        <StyledCoinList>
          <StyledContentTitle>구매품목</StyledContentTitle>
          {/*  // [{selectNation: 'JPY', firstCoin: '4', secondCoin: '4'},{selectNation: 'JPY', firstCoin: '2', secondCoin: '4'}]
  // coinList.map((el) => ) */}
          {coinList.map((el, idx) => {
            return <></>;
          })}
        </StyledCoinList>
      </StyledWrapper>
      <StyledPayWrapper>
        <StyledContentTitle>결제 예정금액</StyledContentTitle>
        <StyledContent>
          <span>상품금액</span>
          <span>{0}원</span>
        </StyledContent>
        <StyledContent>
          <span>배송비</span>
          <span>{0}원</span>
        </StyledContent>
        <StyledContent>
          <span>할인금액</span>
          <span>{0}원</span>
        </StyledContent>
        <StyledResultContent>
          <span>합계</span>
          <span>{0}원</span>
        </StyledResultContent>

        <PayButton></PayButton>
      </StyledPayWrapper>
    </StyledLayout>
  );
};

export default Payment;

const StyledLayout = styled.div`
  display: flex;
`;

const StyledWrapper = styled.div`
  width: 620px;
  padding: 40px;
  box-sizing: border-box;
`;

const StyledPageTitle = styled.h1`
  font-size: 35px;
  font-weight: bold;
  padding-bottom: 20px;
  margin-bottom: 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const StyledCoinList = styled.div``;

const StyledContentTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  margin-bottom: 15px;
  padding-bottom: 15px;
`;

const StyledAddressWrapper = styled.div`
  margin-bottom: 90px;
`;

const StyledPayWrapper = styled.div`
  position: sticky;
  height: 100px;
  top: -70px;
  padding-top: 170px;
  width: 200px;
  /* border: 2px solid black; */
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledResultContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  color: red;
  align-items: center;
  padding-bottom: 25px;
  border-bottom: 1px dotted rgba(0, 0, 0, 0.1);

  & span + span {
    font-size: 30px;
    font-weight: bold;
  }
`;
