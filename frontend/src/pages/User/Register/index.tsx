import Footer from '@/components/Footer';
import { register } from '@/services/ant-design-pro/api';
import { LockOutlined, UserAddOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, Helmet } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, { useState } from 'react';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Register: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>();
  const [type, setType] = useState<string>('account');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const handleSubmit = async (values: API.RegisterParams) => {
    const { password, checkPassword } = values;

    if (password !== checkPassword) {
      return message.error('输入的2次密码不一致');
    }
    try {
      // 注册
      const msg = await register({
        ...values,
        type,
      });
      console.log(msg);

      if (msg.status === 'ok') {
        setUserLoginState(msg);
        const defaultLoginSuccessMessage = '注册成功！';
        //保存token
        message.success(defaultLoginSuccessMessage);

        history.push('/user/login');
        return;
      } else {
        const defaultLoginFaildMessage = '注册失败，可能用户名已存在,请重新输入';
        //保存token
        message.error(defaultLoginFaildMessage);
      }

      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  // const { status, type: loginType } = userLoginState!;
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Lwy's user-center"
          subTitle={'user-center is the best system in houdeyuan'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '注册',
              },
            ]}
          />

          {/* {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码'} />
          )} */}
          {type === 'account' && (
            <>
              <ProFormText
                name="name"
                fieldProps={{
                  size: 'large',
                  prefix: <UserAddOutlined />,
                }}
                placeholder={'请输入您的用户名: '}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入您的密码:'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！,最短输入6个字符',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请再次输入您的密码:'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！,最短输入6个字符',
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
