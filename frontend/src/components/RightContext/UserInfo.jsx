import React, { memo } from 'react';
import myLocalStorage from '../../utils/LocalStorage';
import { USER_INFO } from '../../constants/user';
import UserStyled from './UserStyled';
import { history } from '@umijs/max';

const UserInfo = memo(() => {
  const info = myLocalStorage.getItem(USER_INFO);

  const outLogin = () => {
    history.push('/user/login');
    myLocalStorage.deleteItem();
  };

  return (
    <UserStyled>
      <h4>{info.name} </h4>
      <img src={info.avatorUrl} alt="" width={35 + 'px'} height={35 + 'px'} />
      <div className="btn" onClick={outLogin}>
        退出登录
      </div>
    </UserStyled>
  );
});

export default UserInfo;
