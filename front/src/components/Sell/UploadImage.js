import styled from 'styled-components';
import backImage from 'assets/images/upload_image.png';
import { useEffect, useState, useRef, useCallback } from 'react';

function UploadImage() {
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
        selectFiles = e.target.files[0];
        encodeFile(selectFiles);
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
      };
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {coinImage ? (
        <>
          <PreviewImage src={coinImage}></PreviewImage>
          <StyledBtn
            onClick={() => {
              setCoinImage((preState) => !preState);
            }}>
            다른 사진으로 업로드하기
          </StyledBtn>
        </>
      ) : (
        <>
          <StyledDiv>
            <StyledBackImage src={backImage}></StyledBackImage>
            <StyledP>동전 이미지를 드래그하여 올려놓거나 눌러서 업로드하세요.</StyledP>
            <StyledLabel
              htmlFor="file"
              ref={dragRef}
              isDragging={isDragging}></StyledLabel>
            <StyledImage
              type="file"
              name="file"
              id="file"
              accept="image/*"
              multiple={true}
              onChange={(e) => onUploadImage(e)}
            />
          </StyledDiv>
          <StyledComment>
            인식이 잘 안되는 경우 다른 사진으로 다시 업로드 하실 수 있습니다.
          </StyledComment>
        </>
      )}
    </>
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
  z-index: 10;

  ${(props) => (props.isDragging ? { backgroundColor: 'rgba(0,0,0,0.2)' } : null)}

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

const StyledComment = styled.p`
  margin: 20px auto;
  font-size: 12px;
`;

const PreviewImage = styled.img`
  width: 500px;
  margin: 30px auto;
`;

const StyledBtn = styled.button`
  width: 200px;
  height: 50px;
  background-color: rgba(92, 92, 224, 0.3);
  margin: 0 auto 15px;
  border: 0;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: rgba(92, 92, 224, 0.2);
  }
`;
