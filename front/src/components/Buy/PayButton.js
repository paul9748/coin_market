import { useEffect } from 'react';

import styled from 'styled-components';

import * as Api from 'api/api';

function PayButton() {
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

  return <StyledBtn onClick={onClickPayment}>{'2010원'} 결제하기</StyledBtn>;
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
