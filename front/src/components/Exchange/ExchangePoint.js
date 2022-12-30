import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ROUTE from 'utils/ROUTE';
import * as Api from 'api/api';

function ExchangePoint() {
  const initialValue = { krwAmount: 0, account: '' };
  const navigate = useNavigate();

  const [point, setPoint] = useState();
  const [isClick, setIsClick] = useState(false);
  const [exchangePoint, setExchangePoint] = useState(initialValue);

  const handleChange = (e) => {
    const newExchangePoint = { ...exchangePoint };

    if (e.target.name === 'krwAmount' && e.target.value > point) {
      newExchangePoint[e.target.name] = point;
      return setExchangePoint(newExchangePoint);
    }
    if (e.target.name === 'krwAmount' && e.target.value < 0) {
      newExchangePoint[e.target.name] = 0;
      return setExchangePoint(newExchangePoint);
    }
    newExchangePoint[e.target.name] = e.target.value;

    return setExchangePoint(newExchangePoint);
  };

  const handleClick = () => {
    const newExchangePoint = { ...exchangePoint, krwAmount: point };
    return setExchangePoint(newExchangePoint);
  };

  const requestExchange = async () => {
    try {
      const response = await Api.post('users/wallet', {
        krwAmount: parseInt(exchangePoint.krwAmount),
      });
      alert('환전 신청을 완료하였습니다.');
      navigate(ROUTE.MYPAGE);
    } catch (err) {
      console.log(err);
      alert('환전 신청에 실패하였습니다.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get('users/wallet');
        setPoint(response.data.krwAmount);
      } catch (err) {
        console.log(err);
        if (err.response.data) return alert(err.response.data);
      }
    };
    fetchData();
  }, [navigate]);
  return (
    <StyledExchangeWrapper>
      <StyledContentWrapper>
        <p>
          환전가능포인트: <strong>{point?.toLocaleString()}</strong>KRW
        </p>
      </StyledContentWrapper>
      <StyledContentWrapper>
        <div>
          <label htmlFor="krwAmount">환전금액</label>
          <StyledInput
            name="krwAmount"
            onChange={handleChange}
            value={exchangePoint.krwAmount}
            type="number"
            min="0"></StyledInput>
        </div>
        <StyledMaxBtn onClick={handleClick}>최대</StyledMaxBtn>
      </StyledContentWrapper>
      <StyledContentWrapper>
        <div>
          <label htmlFor="account">출금 실명계좌</label>
          <StyledInput
            value={exchangePoint.account}
            onChange={handleChange}
            name="account"
            type="text"></StyledInput>
        </div>
      </StyledContentWrapper>
      <StyledContentWrapper>
        <StyledContent>
          <p>KRW 출금 주의사항</p>
          <p>포인트 환전 후, 출금되는 기간이 다소 소요될 수 있습니다.</p>
        </StyledContent>
      </StyledContentWrapper>
      <StyledContentWrapper>
        <input
          type="checkbox"
          name="msg"
          onClick={() => {
            setIsClick((preState) => !preState);
          }}></input>
        <label htmlFor="msg">위 주의사항을 확인하였습니다.</label>
      </StyledContentWrapper>
      <StyledBtnWrapper>
        <StyledBtn onClick={() => navigate(ROUTE.MYPAGE)}>이전</StyledBtn>
        <StyledBtn
          onClick={requestExchange}
          disabled={!(exchangePoint.krwAmount > 0 && isClick)}>
          환전 신청
        </StyledBtn>
      </StyledBtnWrapper>
    </StyledExchangeWrapper>
  );
}

export default ExchangePoint;

const StyledExchangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: 'center';
  width: 420px;
  padding: 10px;

  @media (max-width: 520px) {
    width: 300px;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  justify-content: right;
  margin: 10px;
  & > p {
    color: blue;
  }
`;

const StyledInput = styled.input`
  text-align: right;
  width: 330px;
  height: 35px;
  margin-top: 10px;
  @media (max-width: 520px) {
    width: 200px;
  }
`;

const StyledMaxBtn = styled.button`
  width: 60px;
  height: 40px;
  color: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
  }
`;

const StyledContent = styled.div`
  width: 400px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1);

  & p {
    color: rgba(0, 0, 0, 0.4);
  }

  & p:first-child {
    color: rgb(255, 127, 0);
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const StyledBtnWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;

  margin: 40px 0;
`;

const StyledBtn = styled.button`
  width: 170px;
  height: 50px;
  font-weight: bold;
  font-size: 20px;
  border-radius: 20px;
  border: none;
  background-color: rgb(42, 193, 188, 0.6);
  cursor: pointer;

  &:hover {
    background-color: rgb(42, 193, 188, 0.3);
    color: rgba(0, 0, 0, 0.5);
  }
`;
