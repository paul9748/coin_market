import styled from 'styled-components/macro';
import useScrollFadeIn from 'hooks/useScrollFadeIn';
import useScrollClipPath from 'hooks/useScrollClipPath';

function AboutDetail() {
  const animatedItem = {
    0: useScrollFadeIn('up', 1.2, 0.2),
    1: useScrollFadeIn('up', 1.4, 0.2),
    2: useScrollFadeIn('up', 1, 0),
    3: useScrollFadeIn('up', 1, 0),
    4: useScrollFadeIn('up', 1, 0),
  };

  const animatedImage = useScrollClipPath();

  return (
    <StylePage>
      <StyledH1 {...animatedImage}>
        <h1 style={{ color: '#2ac1bc' }}>About 코인마켓</h1>
      </StyledH1>
      <StyledMain>
        <Paragraph {...animatedItem[0]}>
          <p>
            <strong>거리두기 운동으로 인해 답답했던 마음!</strong>
          </p>
          <p>
            <strong>이제 여행으로 해소합시다.</strong>
          </p>
        </Paragraph>
        <Paragraph {...animatedItem[1]}>
          <p>
            <strong>여행 전에는 코인! 필요하시겠죠?</strong>
          </p>
          <p>
            <strong>혹은</strong>
          </p>
          <p>
            <strong>
              묵혀두었던 지난 여행의 잔여물.{' '}
              <u
                style={{
                  textDecorationStyle: 'wavy',
                  textUnderlineOffset: '0.5vmax',
                  color: '#ff7900',
                }}>
                외화!
              </u>
            </strong>
          </p>
          <p>
            <strong>확실하고 편리하게 해결해드립니다!</strong>
          </p>
        </Paragraph>

        <Paragraph {...animatedItem[2]}>
          <PointH5>Point.1</PointH5>
          <p>
            <strong>해외 여행을 계획한 분들은 물론</strong>
          </p>
          <p>
            <strong>여행을 마치고 돌아온 분들이</strong>
          </p>
          <p>
            <strong>
              편리하게 사용할 수 있는{' '}
              <u
                style={{
                  textDecorationStyle: 'wavy',
                  textUnderlineOffset: '0.5vmax',
                  color: '#ff7900',
                }}>
                외화 거래 서비스
              </u>
            </strong>
          </p>
        </Paragraph>
        <Paragraph {...animatedItem[3]}>
          <PointH5>Point.2</PointH5>
          <p>
            <strong>
              조작은{' '}
              <u
                style={{
                  textDecorationStyle: 'wavy',
                  textUnderlineOffset: '0.5vmax',
                  color: '#ff7900',
                }}>
                간단
              </u>
              하고{' '}
              <u
                style={{
                  textDecorationStyle: 'wavy',
                  textUnderlineOffset: '0.5vmax',
                  color: '#ff7900',
                }}>
                신속!
              </u>
            </strong>
          </p>
          <p>
            <strong>
              <u
                style={{
                  textDecorationStyle: 'wavy',
                  textUnderlineOffset: '0.5vmax',
                  color: '#ff7900',
                }}>
                사진
              </u>
              을 통해 빠르고 편리하게
            </strong>
          </p>
          <p>
            <strong>일일이 셈할 필요없이 거래 가능</strong>
          </p>
        </Paragraph>
        <Paragraph {...animatedItem[4]}>
          <PointH5>Point.3</PointH5>
          <p>
            <strong>
              <u
                style={{
                  textDecorationStyle: 'wavy',
                  textUnderlineOffset: '0.5vmax',
                  color: '#ff7900',
                }}>
                안심, 안전 !!
              </u>
            </strong>
          </p>
          <p>
            <strong>
              은행보다 저렴한 수수료{' '}
              <u
                style={{
                  textDecorationStyle: 'wavy',
                  textUnderlineOffset: '0.5vmax',
                  color: '#ff7900',
                }}>
                국내 최저 수수료!
              </u>
            </strong>
          </p>
          <p>
            <strong>
              <u
                style={{
                  textDecorationStyle: 'wavy',
                  textUnderlineOffset: '0.5vmax',
                  color: '#ff7900',
                }}>
                다양한 외화 거래 가능!
              </u>
            </strong>
          </p>
        </Paragraph>
      </StyledMain>
    </StylePage>
  );
}

export default AboutDetail;

const StyledH1 = styled.div`
  position: relative;
  /* background-color: #ccf2f4; */
  font-style: normal;
  font-weight: bold;
  /* font-weight: 30vm; */
  font-size: 3vmax;
  line-height: 3vmax;

  text-align: center;
  padding-left: 100vm;
  padding-right: 100vm;
  padding-top: 10vmax;

  color: #000000;
`;

const StyledMain = styled.div`
  position: relative;
  font-style: normal;
  font-weight: 20vm;
  font-size: 1.5vmax;
  line-height: 3vmax;
  text-align: center;

  color: #000000;
`;

const Paragraph = styled.div`
  position: relative;
  margin-top: 10vmax;
  margin-bottom: 10vmax;
`;

const PointH5 = styled.h5`
  animation: 'Bounce' 1s ease infinite;
  font-weight: bold;
  font-size: 3vmax;
  /* color: #ff7900; */
  color: #2ac1bc;
  @keyframes Bounce {
    from,
    20%,
    53%,
    80%,
    to {
      transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
      transform: translate3d(0, -30px, 0);
    }

    70% {
      transform: translate3d(0, -15px, 0);
    }

    90% {
      transform: translate3d(0, -4px, 0);
    }
  }
`;

const StylePage = styled.main`
  width: 100%;
  padding-left: 30vm;
  padding-right: 30vm;
`;
