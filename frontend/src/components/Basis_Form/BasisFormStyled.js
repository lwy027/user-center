import styled from 'styled-components';

const BasisFormStyled = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 9999;
  height: 500px;
  width: 50vw;
  margin-top: 50px;
  margin-right: 300px;
  background-color: #fafafa;
  border-radius: 10px;
  .ant-form {
    margin-right: 100px;
    margin-top: 100px;
    text-align: center;
  }
`;

export default BasisFormStyled;
