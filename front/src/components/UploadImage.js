import styled from 'styled-components';
import backImage from '../assets/images/upload_image.png';
import { useState } from 'react';

function UploadImage() {
   const [isLoading, setIsLoading] = useState(false);
   const [coinImage, setCoinImage] = useState(null);
   const encodeFile = async (fileBlob) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      try {
         reader.onload = async () => {
            setCoinImage(reader.result);
            setIsLoading((preState) => !preState);
            setTimeout(() => {
               setIsLoading((preState) => !preState);
            }, 3000);
         };
      } catch (err) {
         console.log(err);
      }
   };

   //   const formData = new FormData();

   //   const files = e.target.itemImage.files;

   //   for (let i = 0; i < files.length; i++) {
   //      formData.append('file', files[i]);
   //   }

   //   formData.append('itemName', itemName);

   return (
      <StyledDiv>
         {isLoading ? (
            <Loading>
               <LoadingMark></LoadingMark>
            </Loading>
         ) : null}
         {coinImage ? (
            <img src={coinImage} style={{ width: '420px' }}></img>
         ) : (
            <>
               <StyledBackImage src={backImage}></StyledBackImage>
               <StyledP>동전 이미지를 드래그하여 올려놓거나 눌러서 업로드하세요.</StyledP>
               <StyledLabel htmlFor="file"></StyledLabel>
               <StyledImage
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={(e) => encodeFile(e.target.files[0])}
               />
            </>
         )}
      </StyledDiv>
   );
}

export default UploadImage;

const StyledDiv = styled.div`
   position: relative;
   border: 5px dashed rgba(0, 0, 0, 0.2);
   width: 420px;
   height: 370px;
   margin: 50px auto 10px;
   z-index: 1;
`;

const StyledImage = styled.input`
   display: none;
`;

const StyledLabel = styled.label`
   display: block;
   cursor: pointer;
   width: 420px;
   height: 370px;

   &:hover {
      background-color: rgba(0, 0, 0, 0.2);
   }
`;

const StyledBackImage = styled.img`
   position: absolute;
   width: 125px;
   top: 80px;
   left: 148px;
   z-index: -1;
`;

const StyledP = styled.p`
   position: absolute;
   width: 290px;
   top: 240px;
   left: 80px;
   z-index: -1;
   text-align: center;
   line-height: 27px;
`;

const Loading = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   width: 420px;
   height: 370px;
   z-index: 100;
   background-color: rgba(0, 0, 0, 0.3);
`;

const LoadingMark = styled.div`
   width: 50px;
   height: 50px;
   border: 5px solid rgba(255, 255, 255, 0.3);
   border-radius: 50%;
   border-top-color: #fff;
   animation: spin 1s ease-in-out infinite;

   @keyframes spin {
      to {
         transform: rotate(360deg);
      }
   }
`;
