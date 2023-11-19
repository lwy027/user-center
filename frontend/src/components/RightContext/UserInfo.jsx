import React, { memo } from 'react';
import myLocalStorage from '../../utils/LocalStorage';
import { USER_INFO } from '../../constants/user';
import UserStyled from './UserStyled';
import { history } from '@umijs/max';
import BasisForm from '../Basis_Form';
import { useState } from 'react';

const UserInfo = memo(() => {
  const info = myLocalStorage.getItem(USER_INFO);
  const [isShow, setIsShow] = useState(false);

  const outLogin = () => {
    history.push('/user/login');
    myLocalStorage.deleteItem();
  };
  const handleAvator = () => {
    console.log('---');
    setIsShow(true);
  };

  return (
    <UserStyled>
      <h4>{info.name} </h4>
      <img src={info.avatorUrl} alt="" width={35 + 'px'} height={35 + 'px'} />
      <div className="btn" onClick={outLogin}>
        退出登录
      </div>
      <div className="btn" onClick={handleAvator}>
        修改头像
      </div>
      {isShow && <BasisForm type="file" setIsShow={setIsShow} />}
    </UserStyled>
  );
});

export default UserInfo;
