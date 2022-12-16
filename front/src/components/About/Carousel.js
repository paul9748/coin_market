import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  text-align: center;
  /* background-color: #2ac1bc; */
  background-color: #ccf2f4;
`;

const StyledSlider = styled(Slider)`
  width: auto;

  .slick-list {
    margin: auto;
    overflow-x: hidden;
  }
  .slick-dots {
    //슬라이드의 위치
    bottom: 10px;
    margin-top: 200px;
  }

  .slick-slide div {
    outline: none;
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  /* margin: 100px 100px 100px 100px; */
  display: flex;
  vertical-align: center;
  text-align: center;
  justify-content: center;
  margin: auto;
`;

const Image = styled.img`
  max-width: 70%;
  max-height: 70%;
  vertical-align: center;
  text-align: center;
  /* display: block; */
  margin: auto;
  width: full;
  text-align: center;
  height: full;
  /* justify-content: center; */
`;

import reader from '../../assets/images/정민규.png';
import front from '../../assets/images/신성우.png';
import back from '../../assets/images/문동규.png';
import ai from '../../assets/images/홍지민.png';

const items = [
  { id: 1, url: reader },
  { id: 2, url: front },
  { id: 3, url: back },
  { id: 4, url: ai },
];

function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    autoplay: true,
    centerPadding: '0px',
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
  };
  return (
    <Container>
      {/* <StyledH2>팀원 소개</StyledH2> */}

      <StyledSlider {...settings}>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <ImageContainer>
                <Image src={item.url} />
              </ImageContainer>
            </div>
          );
        })}
      </StyledSlider>
    </Container>
  );
}

export default SimpleSlider;
