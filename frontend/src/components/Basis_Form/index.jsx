import React from 'react';
import { Button, Upload, Form, Input } from 'antd';
import BasisFormStyled from './BasisFormStyled';
import { register, updataAvator, getAvatorById } from '@/services/ant-design-pro/api';
import { message } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const BasisForm = ({ setIsShow, type }) => {
  const onFinish = async (values) => {
    // setIsShow(false);
    if (type === 'account') {
      try {
        // 注册
        const msg = await register({
          ...values,
        });
        if (msg.status === 'ok') {
          const defaultLoginSuccessMessage = '注册成功！';
          //保存token
          message.success(defaultLoginSuccessMessage);
          return;
        } else {
          const defaultLoginFaildMessage = '注册失败，可能用户名已存在,请重新输入';
          //保存token
          message.error(defaultLoginFaildMessage);
        }
      } catch (error) {
        const defaultLoginFailureMessage = '新建失败，请重试！';
        message.error(defaultLoginFailureMessage);
      }
    }
    if (type === 'file') {
      console.log(values);
      const res = await updataAvator(...values?.avator);
      console.log(res);
    }
  };

  const handleExit = () => {
    setIsShow(false);
  };

  return (
    <>
      <BasisFormStyled>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {type === 'account' && (
            <>
              <Form.Item
                label="username"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          )}

          {type === 'file' && (
            <>
              <Form.Item label="选择上传的头像">
                <Form.Item
                  name="avator"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                >
                  <Upload.Dragger name="avator" action="/api/user/avator">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
            </>
          )}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: 10 + 'px' }}
              onClick={handleExit}
            >
              退出
            </Button>
          </Form.Item>
        </Form>
      </BasisFormStyled>
    </>
  );
};
export default BasisForm;
