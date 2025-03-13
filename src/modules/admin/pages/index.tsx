import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalTable } from "@components";
import { AdminType } from "@types";
import { useGetAdmins } from "../hooks/queries";
import AdminsModal from "./modal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setUpdate] = useState<AdminType | null>(null);
  const [tableData, setTableData] = useState<AdminType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [roles,setRoles] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();

  // Pagination params
  const [params, setParams] = useState({
    size: 10,
    page: 1
  });

  // Fetch admins with params
  const { data: admins } = useGetAdmins({
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

  // Update table data when admins change
  useEffect(() => {
    if (admins?.data?.content) {
      setTableData(admins.data.content);
      setTotal(admins.data.paging.totalItems || 0);
    }
  }, [admins]);

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
    setUpdate(null);
  };

  // Edit data
  const editData = (item: AdminType) => {
    setUpdate(item);
    showModal();
  };

  // Table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('en-GB').replace(/\//g, '.')
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button onClick={() => editData(record)}>
              <EditOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <AdminsModal
        open={isModalOpen}
        handleClose={handleClose}
        update={update}
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
          pageSizeOptions: ["2", "4", "6", "10"],
        }}
      />
    </>
  );
};

export default Index;
