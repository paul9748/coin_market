import { useDaumPostcodePopup } from 'react-daum-postcode';
import styled from 'styled-components';

function PostCode({ userInfo, setUserInfo }) {
  const SCRIPT_URL =
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(SCRIPT_URL);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let zoneCode = data.zonecode;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    const newUserInfo = {
      ...userInfo,
      buyer_addr: data.address,
      detailAddress: extraAddress,
      buyer_postcode: zoneCode,
    };

    return setUserInfo(newUserInfo); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const handleChange = (e) => {
    const newUserInfo = { ...userInfo };
    newUserInfo[e.target.name] = e.target.value;

    return setUserInfo(newUserInfo);
  };

  return (
    <>
      <StyledNameInput
        onChange={handleChange}
        type="text"
        name="buyer_name"
        placeholder="받는 사람"
      />
      <div>
        <StyledBtn type="button" onClick={handleClick}>
          주소 찾기
        </StyledBtn>
        <StyledPostCodeInput
          onChange={handleChange}
          type="text"
          name="buyer_postcode"
          value={userInfo['buyer_postcode']}
          placeholder="우편번호"
        />
      </div>
      <div>
        <StyledAddrInput
          type="text"
          onChange={handleChange}
          name="buyer_addr"
          value={userInfo['buyer_addr']}
          placeholder="기본 주소"
        />
        <StyledAddrInput
          type="text"
          onChange={handleChange}
          name="detailAddress"
          value={userInfo['detailAddress']}
          placeholder="상세주소"
        />
      </div>
      <StyledPhoneInput
        type="tel"
        onChange={handleChange}
        name="buyer_tel"
        placeholder="휴대폰 번호"
      />
    </>
  );
}

export default PostCode;

const StyledBtn = styled.button`
  background-color: white;
  vertical-align: middle;
  cursor: pointer;
  font-size: 15px;
  width: 110px;
  height: 40px;
  margin: 15px 15px 15px 0;
  color: rgb(42, 193, 188);
  font-weight: bold;
  border: 2px solid rgba(42, 193, 188, 0.7);
`;

const StyledNameInput = styled.input`
  text-indent: 10px;
  width: 300px;
  height: 35px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const StyledPostCodeInput = styled.input`
  text-indent: 10px;
  height: 35px;
  width: 175px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const StyledAddrInput = styled.input`
  display: block;
  width: 500px;
  text-indent: 10px;
  height: 35px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
  @media (max-width: 630px) {
    width: 420px;
  }
  @media (max-width: 500px) {
    width: 370px;
  }
  @media (max-width: 420px) {
    width: 300px;
  }
`;

const StyledPhoneInput = styled.input`
  width: 300px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 35px;
  text-indent: 10px;
`;
