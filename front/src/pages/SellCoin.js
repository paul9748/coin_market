import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';
import styled from 'styled-components';

import UploadImage from '../components/UploadImage';
// import image_coin_detect from '../assets/images/image_coin_detect.png';

function SellCoin() {
   return (
      <>
         <Header backColor="#2AC1BC" logoImage="white" color="white"></Header>
         <StyledMain>
            <StyledTitle>
               <TitleLabel>STEP 2</TitleLabel>
               <TitleContent>사진을 업로드 해주세요.</TitleContent>
            </StyledTitle>
            <UploadImage></UploadImage>
            <StyledP>
               인식이 잘 안되는 경우 다른 사진으로 다시 업로드 하실 수 있습니다.
            </StyledP>
         </StyledMain>
         <Footer></Footer>
      </>
   );
}

export default SellCoin;

const StyledMain = styled.main`
   display: flex;
   flex-direction: column;
   min-height: calc(100vh - 200px);
   max-width: 1280px;
   margin: 0 auto;
   border: 1px solid black;
`;

const StyledTitle = styled.div`
   display: flex;
   margin: 20px auto;
   width: 1000px;
`;

const TitleLabel = styled.div`
   position: relative;
   padding: 10px;
   border-radius: 10px;
   font-size: 30px;
   font-weight: bold;
   color: white;
   background-color: #2ac1bc;

   &:after {
      border-top: 15px solid #2ac1bc;
      border-left: 30px solid transparent;
      content: '';
      top: 50px;
      right: 10px;
      position: absolute;
   }
`;

const TitleContent = styled.div`
   background-color: rgba(42, 193, 188, 0.2);
   position: relative;
   top: 40px;
   left: 10px;
   width: 450px;
   line-height: 50px;
   text-indent: 20px;
   font-weight: bold;
`;

const StyledP = styled.p`
   margin: 10px auto 30px;
   font-size: 12px;
`;
