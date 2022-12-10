import { useEffect } from 'react';
import styled from 'styled-components';

import { useCoinContext } from 'context/CoinContext';

import * as Api from 'api/api';
import useRate from 'hooks/useRate';

const Payment = () => {
  const { coinList } = useCoinContext();
  const { jpyRate, cnyRate, usdRate } = useRate();

  console.log(process.env.REACT_APP_JPY100);
  // [{selectNation: 'JPY', firstCoin: '4', secondCoin: '4'},{selectNation: 'JPY', firstCoin: '2', secondCoin: '4'}]
  // coinList.map((el) => )

  console.log(coinList);
  console.log(jpyRate, cnyRate, usdRate);

  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.8.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init('imp17132202'); // 결제 데이터 정의
    const data = {
      pg: 'kakaopay',
      pay_method: 'card',
      merchant_uid: 'merchant_' + new Date().getTime(),
      name: 'ffff',
      amount: 64900,
      buyer_email: '',
      buyer_name: '',
      buyer_tel: '',
      buyer_addr: '',
      buyer_postcode: '',
    };
    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    const { success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status } =
      response;

    const data = {};

    if (success) {
      Api.post('buy', { imp_uid, merchant_uid });
      console.log(imp_uid);
    } else {
      alert(`결제 실패 : ${error_msg}`);
    }
  };

  return (
    <StyledWrapper>
      <StyledPageTitle>주문결제</StyledPageTitle>
      <StyledCoinList>
        <StyledContentTitle>구매품목</StyledContentTitle>
        {coinList.map((el, idx) => {
          return <></>;
        })}
      </StyledCoinList>

      <>최종가격</>

      <>
        <>결제 예정금액</>
        <>배송비</>
        <>할인금액</>
        <button onClick={onClickPayment}>결제하기</button>
      </>
    </StyledWrapper>
  );
};

export default Payment;

const StyledWrapper = styled.div`
  width: 700px;
  border: 1px solid black;
`;

const StyledPageTitle = styled.h1`
  font-size: 35px;
  font-weight: bold;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const StyledCoinList = styled.div``;

const StyledContentTitle = styled.h2`
  font-size: 25px;
`;
