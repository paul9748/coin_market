import styled from 'styled-components';

function Footer() {
  return <StyledFooter></StyledFooter>;
}

export default Footer;

const StyledFooter = styled.footer`
  background: rgb(51, 51, 51);
  height: 100px;
  margin-top: auto;
  min-width: 600px;
  @media (max-width: 600px) {
    min-width: 440px;
  }
`;
