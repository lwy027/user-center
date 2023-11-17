import styled from 'styled-components';

const userStyled = styled.div`
  width: 200px;
  display: flex;
  justify-content: end;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 50px;
  z-index: 999;

  .title {
    color: red;
  }
  .btn {
    cursor: pointer;
  }
`;

export default userStyled;
