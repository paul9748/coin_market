import styled from 'styled-components';

function AddCoinModal({ setIsModal, setCoinData }) {
  return (
    <StyledDiv>
      <StyledWrapper>
        <select>
          <option value="JPY">JPY</option>
          <option value="CNY">CNY</option>
          <option value="USD">USD</option>
        </select>
        <select>
          <option value="JPY">JPY</option>
          <option value="CNY">CNY</option>
          <option value="USD">USD</option>
        </select>
        <select>
          <option value="JPY">JPY</option>
          <option value="CNY">CNY</option>
          <option value="USD">USD</option>
        </select>
        <select>
          <option value="JPY">JPY</option>
          <option value="CNY">CNY</option>
          <option value="USD">USD</option>
        </select>
        <StyledBtnWrapper>
          <StyledBtn
            onClick={() => {
              setIsModal((preState) => !preState);
            }}>
            취소
          </StyledBtn>
          <StyledBtn>저장</StyledBtn>
        </StyledBtnWrapper>
      </StyledWrapper>
    </StyledDiv>
  );
}

export default AddCoinModal;

const StyledDiv = styled.div`
  position: absolute;
  width: 100%;
  min-height: 2040px;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

const StyledWrapper = styled.div`
  position: fixed;
  top: 30%;
  width: 450px;
  height: 420px;
  margin: 0 auto;
  left: 0;
  right: 0;
  background-color: white;
`;

const StyledBtn = styled.button`
  width: 100px;
  height: 50px;
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

const StyledBtnWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;

  margin: 40px 0;
`;
