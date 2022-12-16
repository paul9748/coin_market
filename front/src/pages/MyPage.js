import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';
import Table from '../components/Table';

import ROUTE from 'utils/ROUTE';
import * as Api from 'api/api';

function MyPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem('ACCESS_TOKEN')) {
      alert('로그인이 필요합니다.');
      navigate(ROUTE.LOGIN);
    }
  }, [navigate]);
  const initialValue = {
    BUY: 0,
    SELL: 0,
    delivery: 0,
    completion: 0,
    BUYCOMP: 0,
    SELLCOMP: 0,
  };
  const [TableUrlData, setTableUrlData] = useState('');
  const [Wallet, setWallet] = useState('');
  const [ROW, setROW] = useState([]);

  const [countData, setCountData] = useState(initialValue);

  const { BUY, SELL, delivery, completion, BUYCOMP, SELLCOMP } = countData;

  const getCountData = async () => {
    try {
      const response = await Api.get('users/count');
      setCountData(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getWalletPoint = async () => {
    try {
      const WalletPoint = await Api.get('users/wallet');
      setWallet(WalletPoint.data['krwAmount']);
    } catch (err) {
      console.log(err);
    }
  };
  const getRow = async (TableUrlData) => {
    try {
      let newRowdata = await Api.get('users/deals?status=' + TableUrlData);
      newRowdata = newRowdata.data;
      newRowdata.map((i) => {
        i['createdAt'] = i['createdAt'].slice(0, 10) + ' ' + i['createdAt'].slice(11, 19);
        i['updatedAt'] = i['updatedAt'].slice(0, 10) + ' ' + i['updatedAt'].slice(11, 19);
        if (i['delivery'] == null && i['dealStatus'] == 'SELL' && i['isActivate'] == 0) {
          i['Status'] = '운송장추가';
        } else if (i['dealStatus'] == 'SELL' && i['isActivate'] == 0) {
          i['Status'] = '판매확인';
        }
        return i;
      });
      setROW(newRowdata);
    } catch (err) {
      console.log(err);
    }
  };
  const columns = useMemo(
    () => [
      {
        accessor: 'id',
        Header: '거래ID',
      },
      {
        accessor: 'dealStatus',
        Header: '거래종류',
      },
      {
        accessor: 'imageUrl',
        Header: '이미지',
      },
      {
        accessor: 'createdAt',
        Header: '최초신청시간',
      },
      {
        accessor: 'updatedAt',
        Header: '최근거래시간',
      },
      {
        accessor: 'Status',
        Header: '상태',
      },
    ],
    []
  );

  useEffect(() => {
    if (!sessionStorage.getItem('ACCESS_TOKEN')) {
      navigate(ROUTE.LOGIN);
    }
    getCountData();
    getWalletPoint();
    getRow(TableUrlData);
  }, [navigate, TableUrlData]);

  return (
    <>
      <Header></Header>
      <StyledMain>
        <StyledTitleBox>
          <StyledTitle>마이페이지</StyledTitle>
        </StyledTitleBox>
        <StyledInfoBox>
          <StyledWalletBox>
            <StyledText>환전가능금액</StyledText>
            <StyledPointText>{Wallet.toLocaleString() || 0}원</StyledPointText>
            <StyledBtn onClick={() => navigate(ROUTE.EXCHANGE)}>환전하기</StyledBtn>
          </StyledWalletBox>
          <StyledDealBox>
            <StyledTitle
              onClick={() => {
                setTableUrlData('');
              }}>
              거래현황
            </StyledTitle>
            <StyledDetailBox>
              <StyledText>구매신청</StyledText>
              <StyledInfoBtn
                href="#"
                id="BUY"
                onClick={() => {
                  setTableUrlData('BUY');
                }}>
                {BUY}
              </StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>배송중ㅤ</StyledText>
              <StyledInfoBtn
                href="#"
                id="delivery"
                onClick={() => {
                  setTableUrlData('delivery');
                }}>
                {delivery}
              </StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>구매완료</StyledText>
              <StyledInfoBtn
                href="#"
                id="BUYCOMP"
                onClick={() => {
                  setTableUrlData('BUYCOMP');
                }}>
                {BUYCOMP}
              </StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>판매신청</StyledText>
              <StyledInfoBtn
                href="#"
                id="SELL"
                onClick={() => {
                  setTableUrlData('SELL');
                }}>
                {SELL}
              </StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>배송완료</StyledText>
              <StyledInfoBtn
                href="#"
                id="completion"
                onClick={() => {
                  setTableUrlData('completion');
                }}>
                {completion}
              </StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>판매완료</StyledText>
              <StyledInfoBtn
                href="#"
                id="SELLCOMP"
                onClick={() => {
                  setTableUrlData('SELLCOMP');
                }}>
                {SELLCOMP}
              </StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
          </StyledDealBox>
        </StyledInfoBox>
        <Table columns={columns} data={ROW} />
      </StyledMain>

      <Footer></Footer>
    </>
  );
}
export default MyPage;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  border-top: 20px solid rgba(0, 0, 0, 0.1);
  padding: 30px;
  box-sizing: border-box;

  min-height: calc(100vh - 200px);
  min-width: 600px;

  @media (max-width: 600px) {
    margin: 0px;
    min-width: auto;
  }
`;
const StyledTitleBox = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  width: 100%;
`;
const StyledInfoBox = styled.div`
  display: flex;
  margin: 20px 0 30px 0;
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  /* @media (max-width: 460px) {
    margin: 0px;
    width: 50%;
  } */
`;
const StyledDealBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  flex-wrap: wrap;
  padding: 10px;
  margin-left: 40px;
  @media (max-width: 600px) {
    width: 50%;
    margin-left: 5px;
  }
`;

const StyledDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 30px;
  flex-wrap: wrap;
`;

const StyledWalletBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 150px;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border-right: 2px solid rgba(0, 0, 0, 0.2);
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const StyledTitle = styled.p`
  font-size: 30px;
  margin-bottom: 25px;
  font-weight: bold;
  float: left;
  width: 100%;
  @media (max-width: 600px) {
    font-size: 15px;
  }
`;
const StyledText = styled.p`
  font-size: 20px;
  margin: 0 auto 10px;
  text-align: center;
  padding: 5px;
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const StyledPointText = styled.p`
  font-size: 33px;
  margin: 0 auto 20px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
  @media (max-width: 674px) {
    font-size: 25px;
  }
  @media (max-width: 640px) {
    font-size: 20px;
  }
`;
const StyledBtn = styled.button`
  width: 100px;
  height: 40px;
  border: 0;
  border-radius: 10px;
  color: white;
  background-color: rgba(42, 193, 188, 0.7);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: rgba(42, 193, 188, 0.3);
  }
`;
const StyledInfoBtn = styled.a`
  text-decoration: none;
  font-size: 20px;
  margin: 0 auto 10px;
  font-weight: bold;
  text-align: right;
  padding: 5px;
  width: 160px;
  color: blue;
  @media (max-width: 600px) {
    /* font-size: 15px; */
    width: 40px;
  }
`;
