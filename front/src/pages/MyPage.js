import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import ROUTE from 'utils/ROUTE';

function MyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('ACCESS_TOKEN')) {
      navigate(ROUTE.LOGIN);
    }
  }, [navigate]);

  const columns = useMemo(
    () => [
      {
        accessor: 'coinName',
        Header: '동전명',
      },
      {
        accessor: 'dealAmount',
        Header: '신청수량',
      },
      {
        accessor: 'stockAmount',
        Header: '남은수량',
      },
      {
        accessor: 'updatedAt',
        Header: '최근거래시간',
      },
      {
        accessor: 'isActivate',
        Header: '진행사항',
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        coinName: '100엔',
        dealAmount: 10,
        stockAmount: 10,
        updatedAt: '2022-12-11 10:10',
        isActivate: 1,
      },
    ],
    []
  );

  const {
    getTableProps, //table props
    getTableBodyProps, //table body props
    headerGroups, //헤더들
    rows, //로우 데이터들
    prepareRow,
  } = useTable({ columns, data });

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
            <StyledText>가져온금액</StyledText>
            <StyledBtn>환전하기</StyledBtn>
          </StyledWalletBox>
          <StyledDealBox>
            <StyledTitle>거래현황</StyledTitle>
            <StyledDetailBox>
              <StyledText>구매신청</StyledText>
              <StyledInfoBtn href="#">7</StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>배송중ㅤ</StyledText>
              <StyledInfoBtn href="#">7</StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>구매완료</StyledText>
              <StyledInfoBtn href="#">7</StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>판매신청</StyledText>
              <StyledInfoBtn href="#">7</StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>배송완료</StyledText>
              <StyledInfoBtn href="#">7</StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>판매완료</StyledText>
              <StyledInfoBtn href="#">7</StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
          </StyledDealBox>
        </StyledInfoBox>
        <Table columns={columns} data={data} />
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