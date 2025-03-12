import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalTable, GlobalSearch } from '@components';
import { ConfirmDelete } from "@components";
import { ParamsType, RolesResponse } from "@types";
import { useGetPermessions, useGetRoles } from "../hooks/queries";
import RolesModal from "./modal";

const Index = () => {
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { data: permessions } = useGetPermessions();
  const { search } = useLocation();
  const [permessionL, setPermessionL] = useState([]);

  // Pagination params
  const [params, setParams] = useState({
    size: 3,
    page: 1
  });

  // Fetch roles with params
  const { data: roles } = useGetRoles<RolesResponse>({
    size: params.size,
    page: params.page - 1,  
  });

  // Set params from URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    let page = Number(queryParams.get("page")) || 0;
    let size = Number(queryParams.get("size")) || 2;

    setParams({ size, page });
  }, [search]);

  // Update table data when roles change
  useEffect(() => {
    if (roles?.data?.content) {
      setTableData(roles.data.content);
      setTotal(roles.paging?.totalItems || 0);
    }
  }, [roles]);

  // Handle table pagination change
  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination;
    
    setParams({ size: pageSize, page: current });

    // Update URL
    navigate(`?page=${current}&size=${pageSize}`);
  };

  // Update search params
  const updateParams = (newParams: ParamsType) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  // Open and close modal
  const showModal = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    setUpdate({});
  };

  // Fetch permissions
  useEffect(() => {
    if (permessions) {
      setPermessionL(permessions);
    }
  }, [permessions]);

  // Edit data
  const editData = (item: any) => {
    setUpdate(item);
    showModal();
  };

  // Delete data
  const deleteData = async (id: number) => {
    mutate(id);
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
        <Space size="middle">
          <Tooltip title="edit">
            <Button onClick={() => editData(record)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <ConfirmDelete
            id={record.id}
            onConfirm={deleteData}
            onCancel={() => console.log('Cancelled')}
            title={"Delete this Role?"}
          />
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
        permessionL={permessionL}
      />
      <div className="flex items-center justify-between py-4">
        <GlobalSearch updateParams={updateParams} placeholder={"Search Roles"} />
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
          pageSizeOptions: ['2', '3', '4', '6']
        }}
      />
    </>
  );
};

export default Index;
