import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import * as Api from 'api/api';
import ROUTE from 'utils/ROUTE';

function PayButton({ userInfo, sumBuyCoin, reportCoinList, rateToken }) {
  const navigate = useNavigate();
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
    if (
      userInfo.buyer_addr.length < 1 ||
      userInfo.buyer_name.length < 1 ||
      userInfo.buyer_postcode.length < 1 ||
      userInfo.buyer_tel < 1
    ) {
      return alert('배송 정보를 입력해주시기바랍니다.');
    }

    const { IMP } = window;
    IMP.init('imp17132202'); // 결제 데이터 정의
    const data = {
      pg: 'kakaopay',
      pay_method: 'card',
      merchant_uid: 'merchant_' + new Date().getTime(),
      name: '동전',
      amount: sumBuyCoin,
      buyer_email: '',
      buyer_name: userInfo.buyer_name,
      buyer_tel: userInfo.buyer_tel,
      buyer_addr: userInfo.buyer_addr + userInfo.detailAddress,
      buyer_postcode: userInfo.buyer_postcode,
      m_redirect_url: 'http://kdt-ai5-team07.elicecoding.com/buyend',
    };
    IMP.request_pay(data, callback);
  };

  const callback = async (response) => {
    const { success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status } =
      response;

    const data = {
      order: {
        dealStatus: 'BUY',
      },
      address: {
        resAddress1: userInfo.buyer_addr,
        resAddress2: userInfo.detailAddress,
        resName: userInfo.buyer_name,
      },
      coins: reportCoinList,
      pay: {
        amount: sumBuyCoin,
        exchangeRateToken: rateToken,
        payCode: imp_uid,
      },
    };

    if (success) {
      try {
        const response = await Api.post('buy', data);
        navigate(ROUTE.BUYEND);
      } catch (err) {
        console.log(err);
        alert('결제가 완료되지 못했습니다.');
        if (
          err.response.data.name === 'TokenExpiredError' ||
          err.response.data === 'jwt expired'
        ) {
          alert('재로그인 부탁드립니다.');
          navigate(ROUTE.LOGIN);
        }
      }
    } else {
      alert(`결제 실패 : ${error_msg}`);
    }
  };

  return (
    <StyledBtn onClick={onClickPayment}>
      {sumBuyCoin.toLocaleString()}원 결제하기
    </StyledBtn>
  );
}

export default PayButton;

const StyledBtn = styled.button`
  cursor: pointer;
  width: 200px;
  height: 50px;
  margin-top: 40px;
  background-color: rgb(255, 0, 56);
  font-size: 15px;
  font-weight: bold;
  color: white;
  border: none;
`;
