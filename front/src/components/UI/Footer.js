import styled from 'styled-components';
import logo from '../../assets/images/coin_market(2).png';
function Footer() {
  return (
    <StyledFooter>
      <AllContents>
        <LogoDiv>
          <LogoImg src={logo}></LogoImg>
        </LogoDiv>
        <CompanyDetail>
          <StyledPtag style={{ textAlign: 'center' }}>
            상호 : (주)코인마켓 | 대표자 : 7zip
          </StyledPtag>
          <StyledPtag style={{ textAlign: 'center' }}>
            사업자등록번호 : 000-00-00000
          </StyledPtag>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
            <StyledPtag
              style={{ textAlign: 'center', marginRight: '5px', marginLeft: '5px' }}>
              연락처 : 000-0000-0000
            </StyledPtag>
            <StyledPtag
              style={{ textAlign: 'center', marginRight: '5px', marginLeft: '5px' }}>
              팩스 : 000-000-0000
            </StyledPtag>
          </span>
          <StyledPtag style={{ textAlign: 'center' }}>
            이메일 : CoinMarket@elice.com
          </StyledPtag>
          <StyledPtag style={{ textAlign: 'center' }}>
            주소 : 서울특별시 송파구 올림픽로 300 롯데월드타워 117F
          </StyledPtag>
          <CopyRightDiv>
            <StyledPtag style={{ textAlign: 'center' }}>
              이용약관 <strong>개인정보처리방침</strong>
            </StyledPtag>
            <StyledPtag style={{ textAlign: 'center' }}>Copyright © 코인마켓</StyledPtag>
          </CopyRightDiv>
        </CompanyDetail>
      </AllContents>
    </StyledFooter>
  );
}

export default Footer;

const StyledFooter = styled.footer`
  background: rgb(51, 51, 51);
  height: auto;
  min-width: 600px;
  margin: auto;

  @media (max-width: 700px) {
    min-width: 440px;
  }
  @media (max-width: 450px) {
    min-width: 400px;
  }
  @media (max-width: 400px) {
    min-width: 390px;
  }
`;
const AllContents = styled.div`
  display: flex;
  text-align: center;
  vertical-align: middle;
  margin: auto;
`;
const LogoDiv = styled.div`
  display: table;
  text-align: 'center';
  padding: 10px;
  margin-top: auto;
  margin-bottom: auto;
`;

const LogoImg = styled.img`
  height: 150px;
  margin: 50px;
  vertical-align: middle;
  @media (max-width: 700px) {
    height: 100px;
    margin: auto;
    padding-left: 15px;
  }
`;

const CompanyDetail = styled.div`
  text-align: 'center';
  /* align-self: 'center' */
  padding: 40px 100px 40px 100px;
  color: white;
  margin: auto;
  @media (max-width: 700px) {
    padding: 10px 50px 10px 50px;
  }
`;

const StyledPtag = styled.p`
  text-align: 'center';
  line-height: 30px;
  font-size: 20px;
  @media (max-width: 750px) {
    line-height: 19px;
    font-size: 10px;
  }
`;

const CopyRightDiv = styled.div`
  margin-top: 50px;
  @media (max-width: 700px) {
    margin-top: 10px;
  }
`;
