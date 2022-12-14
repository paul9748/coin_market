import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';
import styled from 'styled-components';
import ROUTE from 'utils/ROUTE';
import * as Api from 'api/api';
import Table from '../components/Table';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

function MyPage() {
  const navigate = useNavigate();
  const [TableUrlData, setTableUrlData] = useState('');
  const [Wallet, setWallet] = useState('');
  const [ROW, setROW] = useState([]);
  const [BUY, setBUY] = useState();
  const [SELL, setSELL] = useState();
  const [delivery, setDelivery] = useState();
  const [completion, setCompletion] = useState();
  const [BUYCOMP, setBUYCOMP] = useState();
  const [SELLCOMP, setSELLCOMP] = useState();

  const getData = async () => {
    const newData = await Api.get('users/count');
    const WalletPoint = await Api.get('users/wallet');
    setWallet(WalletPoint.data['krwAmount']);
    setBUY(newData.data['BUY']);
    setSELL(newData.data['SELL']);
    setDelivery(newData.data['delivery']);
    setCompletion(newData.data['completion']);
    setBUYCOMP(newData.data['BUYCOMP']);
    setSELLCOMP(newData.data['SELLCOMP']);
  };

  const getRow = async (TableUrlData) => {
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

  const data = useMemo(
    () => [
      {
        id: '100엔',
        dealAmount: 10,
        stockAmount: 10,
        updatedAt: '2022-12-11 10:10',
        isActivate: 1,
        test: '테테테스트',
      },
    ],
    []
  );

  useEffect(() => {
    if (!sessionStorage.getItem('ACCESS_TOKEN')) {
      navigate(ROUTE.LOGIN);
    }
    getData();
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
            <StyledText>{Wallet}</StyledText>
            <StyledBtn>환전하기</StyledBtn>
          </StyledWalletBox>
          <StyledDealBox>
            <StyledTitle
              onClick={() => {
                setTableUrlData('');
                getData(TableUrlData);
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
                  getData(TableUrlData);
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
                  getData(TableUrlData);
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
                  getData(TableUrlData);
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
                  getData(TableUrlData);
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
                  getData(TableUrlData);
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
                  getData(TableUrlData);
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

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  min-height: calc(100vh - 200px);
  min-width: 600px;

  @media (max-width: 600px) {
    min-width: 300px;
  }
  margin-left: 5%;
  margin-right: 5%;
`;
const StyledTitleBox = styled.main`
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: left;
  width: 100%;
`;
const StyledInfoBox = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-style: solid none solid none;
`;
const StyledDealBox = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  border-style: none solid none none;
  flex-wrap: wrap;
  padding: 30px 30px 30px 30px;
`;

const StyledDetailBox = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 30px;
  border-style: none;
  flex-wrap: wrap;
`;

const StyledWalletBox = styled.main`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 150px;
  justify-content: center;
  align-items: center;
  border-style: none solid none none;
  padding: 30px 30px 30px 30px;
`;

const StyledTitle = styled.p`
  font-size: 30px;
  margin: 0 auto 10px;
  font-weight: bold;
  float: left;
  width: 100%;
`;
const StyledText = styled.p`
  font-size: 20px;
  margin: 0 auto 10px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
`;
const StyledBtn = styled.button`
  width: 100px;
  height: 30px;
  border: 0;
  border-radius: 10px;
  background-color: rgba(42, 193, 188, 0.5);
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
`;
export default MyPage;
