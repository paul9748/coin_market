import styled from 'styled-components';

function AboutDetail() {
  return (
    <>
      <StyledH1 style={{ marginLeft: '100px', marginRight: '100px' }}>
        <h1>About 코인마켓</h1>
      </StyledH1>
      <StyledH5>
        <h5>거리두기 운동으로 인해 답답했던 마음! </h5>
        <h5>이제 여행으로 해소합시다.</h5>
        <br></br>
        <br></br>
        <h5>여행 전에는 코인! 필요하시겠죠?</h5>
        <h5>혹은</h5>
        <h5>묵혀뒀던 지난 여행의 잔여물. 외화!</h5>
        <h5>확실하고 편리하게 해결해드립니다!</h5>
        <br></br>
        <br></br>
        <br></br>
        <h5 style={{ fontWeight: '300px', fontSize: '50px', color: '#ff7900' }}>
          Point.1
        </h5>
        <h5>해외 여행을 계획한 분들은 물론</h5>
        <h5>여행을 마치고 돌아온 분들이 </h5>
        <h5>편리하게 사용할 수 있는 교환 서비스</h5>
        <br></br>
        <br></br>
        <br></br>
        <h5 style={{ fontWeight: '300px', fontSize: '50px', color: '#ff7900' }}>
          Point.2
        </h5>
        <h5>조작은 간단하고 신속!</h5>
        <h5>사진을 통해 빠르고 편리하게 </h5>
        <h5>일일이 셈할 필요없이 거래 가능</h5>
        <br></br>
        <br></br>
        <br></br>
        <h5 style={{ fontWeight: '300px', fontSize: '50px', color: '#ff7900' }}>
          Point.3
        </h5>
        <h5>안심, 안전 !!</h5>
        <h5>은행보다 저렴한 수수료 국내 최저 수수료!</h5>
        <h5>다양한 외화 거래 가능!</h5>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </StyledH5>
    </>
  );
}

export default AboutDetail;

const StyledH1 = styled.div`
  /* display: inline; */
  background-color: #ccf2f4;
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 350px;
  vertical-align: center;
  text-align: center;

  color: #000000;

  @media (max-width: 500px) {
    padding-top: 70px;
    font-weight: 700px;
    font-size: 64px;
    line-height: 64px;
  }
`;

const StyledH5 = styled.div`
  font-family: 'Amaranth';
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 50px;
  text-align: center;
  letter-spacing: 0.2em;

  color: #000000;
`;
