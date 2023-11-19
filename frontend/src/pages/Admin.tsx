import { getAllUser } from '@/services/ant-design-pro/api';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag, Watermark } from 'antd';
import { useEffect, useRef, useState } from 'react';
import WaterMark from '@/components/WaterMark';
import BasisForm from '@/components/Basis_Form';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

type GithubIssueItem = {
  id: number;
  name: string;
  isAdmin: number;
  createAt: string;
  updateAt: string;
  avatorUrl: string;
  key: string;
  url: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '头像',
    dataIndex: 'avatorUrl',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    valueType: 'image',
    render: (_, record) => {
      return (
        <>
          <img src={record.avatorUrl} alt="" width={50 + 'px'} height={50 + 'px'} />
        </>
      );
    },
  },

  {
    title: '角色',
    dataIndex: 'isAdmin',
    ellipsis: true,
    tip: '标题过长会自动收缩',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '普通用户',
        status: 'default',
      },
      1: {
        text: '管理员',
        status: 'Success',
      },
    },
  },

  {
    title: '创建时间',
    key: 'createAt',
    dataIndex: 'createAt',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '更新时间',
    key: 'updataAT',
    dataIndex: 'updataAT',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          const { data } = await getAllUser();
          const { userData } = data as any;
          return {
            data: userData,
          };
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsShow(true);
              actionRef.current?.reload();
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      {isShow && <BasisForm type="account" setIsShow={setIsShow} />}
      <WaterMark />
    </>
  );
};
