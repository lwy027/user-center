import { WaterMark } from '@ant-design/pro-components';

import WaterMarkStyled from './WaterMarkStyled';
const info = JSON.parse(localStorage.getItem('userInfo'));

export default () => (
  <WaterMarkStyled>
    <WaterMark content={info.name}>
      <div style={{ height: 500 }} />
    </WaterMark>
  </WaterMarkStyled>
);
