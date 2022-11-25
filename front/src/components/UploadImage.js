import styled from 'styled-components';
import backImage from '../assets/images/upload_image.png';
import { useEffect, useState, useRef, useCallback } from 'react';

function UploadImage() {
   const [isLoading, setIsLoading] = useState(false);
   const [isDragging, setIsDragging] = useState(false);
   const [coinImage, setCoinImage] = useState(null);

   const dragRef = useRef(null);

   const onUploadImage = useCallback(
      (e) => {
         let selectFiles = coinImage;

         if (e.type === 'drop') {
            selectFiles = e.dataTransfer.files[0];
            encodeFile(selectFiles);
         } else {
            selectFiles = e.target.files;
         }

         setCoinImage(selectFiles);
      },
      [coinImage]
   );

   const handleDragIn = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
   }, []);

   const handleDragOut = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(false);
   }, []);

   const handleDragOver = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer?.files) {
         setIsDragging(true);
      }
   }, []);

   const handleDrop = useCallback(
      (e) => {
         e.preventDefault();
         e.stopPropagation();

         onUploadImage(e);
         setIsDragging(false);
      },
      [onUploadImage]
   );

   const initDragEvents = useCallback(() => {
      if (dragRef.current !== null) {
         dragRef.current.addEventListener('dragenter', handleDragIn);
         dragRef.current.addEventListener('dragleave', handleDragOut);
         dragRef.current.addEventListener('dragover', handleDragOver);
         dragRef.current.addEventListener('drop', handleDrop);
      }
   }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

   const resetDragEvents = useCallback(() => {
      if (dragRef.current !== null) {
         dragRef.current.removeEventListener('dragenter', handleDragIn);
         dragRef.current.removeEventListener('dragleave', handleDragOut);
         dragRef.current.removeEventListener('dragover', handleDragOver);
         dragRef.current.removeEventListener('drop', handleDrop);
      }
   }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

   useEffect(() => {
      initDragEvents();

      return () => resetDragEvents();
   }, [initDragEvents, resetDragEvents]);

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
               <StyledLabel htmlFor="file" ref={dragRef}></StyledLabel>
               <StyledImage
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  multiple={true}
                  onChange={(e) => onUploadImage(e)}
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
