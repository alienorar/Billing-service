import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalTable } from '@components';
import { RoleType } from "@types";
import {  useGetPermessionTree, useGetRoleById, useGetRoles } from "../hooks/queries";
import RolesModal from "./modal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setUpdate] = useState<RoleType | undefined>(undefined);
  const [tableData, setTableData] = useState<RoleType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const navigate = useNavigate();
  const { search } = useLocation();
  const [selectedPermL, setSelectedPermL] = useState([]);
  const [roleId, setRoleId] = useState<number | string | undefined>(undefined);
  const { data: permessionTree } = useGetPermessionTree()

  // Pagination params
  const [params, setParams] = useState({
    size: 10,
    page: 1
  });

  // Fetch roles with params
  const { data: roles } = useGetRoles({
    size: params.size,
    page: params.page - 1,
  });

  // Set params from URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    let page = Number(queryParams.get("page")) || 1;
    let size = Number(queryParams.get("size")) || 10;
    setParams({ size, page });
  }, [search]);

  // Update table data when roles change
  useEffect(() => {
    if (roles?.data.content) {
      setTableData(roles.data.content);
      setTotal(roles.data.paging.totalItems || 0);
    }
  }, [roles]);

  // Handle table pagination change
  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    setParams({ size: pageSize, page: current });
    navigate(`?page=${current}&size=${pageSize}`);
  };

  // Open and close modal
  const showModal = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    setUpdate(undefined);
  };


  // Fetch permissions
  useEffect(() => {
    if (permessionTree) {
      setSelectedPermL(permessionTree);
    }
  }, [permessionTree]);


  // Fetch role data by ID when roleId changes
  const { data: updateData } = useGetRoleById(roleId||"");

  useEffect(() => {
    if (updateData?.data) {
      setUpdate(updateData.data);
    }
  }, [updateData]);



  // Edit data
  const editData = (item: number | string | undefined) => {
    setRoleId(item);
    showModal();
  };

  // Table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Role Name",
      dataIndex: "name",
    },
    {
      title: "Display Name",
      dataIndex: "displayName",
    },
    {
      title: "Default URL",
      dataIndex: "defaultUrl",
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle" className="text-center">
          <Tooltip title="edit">
            <Button onClick={() => editData(record.id)} className="flex items-center justify-center">
              <EditOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <RolesModal
        open={isModalOpen}
        handleClose={handleClose}
        update={update}
        permessionL={selectedPermL}
        selectedPermL={selectedPermL}
      />
      <div className="flex items-center justify-end py-4 px-5">
        <Button
          type="primary"
          size="large"
          style={{ maxWidth: 160, minWidth: 80, backgroundColor: "#1E9FD9", color: "white", height: 40 }}
          onClick={showModal}
        >
          Create
        </Button>
      </div>
      <GlobalTable
        data={tableData}
        columns={columns}
        handleChange={handleTableChange}
        pagination={{
          current: params.page,
          pageSize: params.size,
          total: total || 0,
          showSizeChanger: true,
          pageSizeOptions: ['2', '4', '6', '10']
        }}
      />
    </>
  );
};

export default Index;