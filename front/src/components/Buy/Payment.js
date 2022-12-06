import axios from 'axios';
import { useEffect } from 'react';

const Payment = (effect, deps) => {
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
      merchant_uid: 'ORD20180131-0000011',
      name: '노르웨이 회전 의자',
      amount: 64900,
      buyer_email: 'gildong@gmail.com',
      buyer_name: '홍길동',
      buyer_tel: '010-4242-4242',
      buyer_addr: '서울특별시 강남구 신사동',
      buyer_postcode: '01181',
    };
    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    const { success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status } =
      response;
    if (success) {
      axios({
        url: '/',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          imp_uid,
          merchant_uid,
        },
      }).then((data) => {
        alert('결제 성공');
      });
    } else {
      alert(`결제 실패 : ${error_msg}`);
    }
  };

  return (
    <>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  );
};

export default Payment;
