import styled from 'styled-components';

function RegisterForm() {
  return (
    <StyledForm>
      <StyledLabel>아이디</StyledLabel>
      <StyledInput type="text"></StyledInput>
      <div style={{ visibility: 'hidden', height: '10px', width: '300px' }}></div>
      <StyledLabel>비밀번호</StyledLabel>
      <StyledInput type="password"></StyledInput>
      <div style={{ visibility: 'hidden', height: '10px', width: '300px' }}></div>
      <StyledLabel>비밀번호 확인</StyledLabel>
      <StyledInput type="password"></StyledInput>
      <div style={{ visibility: 'hidden', height: '10px', width: '300px' }}></div>
      <StyledLabel>성명</StyledLabel>
      <StyledInput type="text"></StyledInput>
      <div style={{ visibility: 'hidden', height: '10px', width: '300px' }}></div>
      <BtnLogin type="submit">회원가입</BtnLogin>
    </StyledForm>
  );
}

export default RegisterForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 700px;
  margin: 100px auto;
  background-color: #d9d9d9;
  border-radius: 40px;
  filter: drop-shadow(20px 10px 4px rgba(0, 0, 0, 0.25));
`;

const StyledInput = styled.input`
  color: black;
  border: none;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 0;
  width: 300px;
  text-indent: 20px;
  box-sizing: border-box;
  margin-bottom: 30px;
`;

const StyledLabel = styled.label`
  align-self: flex-start;
  margin-left: 50px;
  padding: 8px;
  background-color: rgba(42, 193, 188, 0.3);
  font-weight: bold;
`;

const BtnLogin = styled.button`
  height: 50px;
  margin: 10px 50px;
  width: 300px;
  cursor: pointer;
  background-color: rgb(42, 193, 188);
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background-color: rgba(42, 193, 188, 0.5);
  }
`;
