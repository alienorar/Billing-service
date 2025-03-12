import { useState, useEffect } from "react";
import { Button, Space, Tooltip } from "antd";
import { EditOutlined, EnterOutlined } from '@ant-design/icons';
import { ConfirmDelete, GlobalSearch, GlobalTable } from "@components";
import { useGetCategory } from "../hooks/queries";
import { useLocation, useNavigate } from "react-router-dom";
import CategoriesModal from "./modal";
import { useDeleteCategory } from "../hooks/mutations";
import { ParamsType } from "@types";
import { CategoryType } from "../types";
const Index = () => {
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState();
  const [update, setUpdate] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { search } = useLocation()
  const navigate = useNavigate()
  const [params, setParams] = useState({
    search: "",
    limit: 2,
    page: 1
  });

  const { data } = useGetCategory(params);
  const { mutate } = useDeleteCategory()
  useEffect(() => {
    const params = new URLSearchParams(search)
    let page = Number(params.get("page")) || 1;
    let limit = Number(params.get("limit")) || 2;
    let search_value = params.get("search") || "";
    setParams((prev) => ({
      ...prev,
      limit: limit,
      page: page,
      search: search_value,
    }))
  }, [search])


  // ============ TABLE ==============
  const handleTableChange = (pagination: any) => {
    const { current, pageSize } = pagination
    setParams((prev) => ({
      ...prev,
      limit: pageSize,
      page: current,
    })
    )
    const searchParams = new URLSearchParams(search)
    searchParams.set("page", `${current}`)
    searchParams.set('limit', `${pageSize}`)
    navigate(`?${searchParams}`)
  }
  const updateParams = (newParams: ParamsType) => {
    setParams((prev) => ({
      ...prev,
      ...newParams
    }));
  };

  //  ============ MODAL ===========
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setUpdate({})
  };

  // =========== EDIT DATA ===========
  const editData = (item:CategoryType) => {
    setUpdate(item);
    showModal()
  };

  // ======== DELETE DATA ========= 
  const deleteData = (id: number | string) => {
    mutate(id)

  };

  // ========== SINGLE PAGE ===========
  const handleView = (id: number | undefined) => {
    navigate(`/admin-panel/categories/${id}`);
  }


  // ========== GET CATEGORIES ===========
  const getData = () => {
    if (data?.data?.data?.categories) {
      setTableData(data.data.data.categories);
      setTotal(data.data.data.count)
    }
  }

  useEffect(() => {
    getData()
  }, [data]);


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: "Name",
      dataIndex: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('en-GB').replace(/\//g, '.')
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Tooltip title="edit"><Button><EditOutlined className="text-[18px]" onClick={() => editData(record)} /></Button></Tooltip>
          <ConfirmDelete
            id={record.id}
            onConfirm={deleteData}
            onCancel={() => console.log('Cancelled')}
            title={"Delete this Brands ?"}
          />
          <Tooltip title="view">
            <Button onClick={() => handleView(record.id.toString())}><EnterOutlined className="text-[18px]" /></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <GlobalSearch updateParams={updateParams} placeholder={"Search Categories"} />
        <div className="flex gap-2 items-center ">
          <Button type="primary" size="large" style={{ maxWidth: 160, minWidth: 80, backgroundColor: "orangered", color: "white", height: 40 }} onClick={showModal}>
            Create
          </Button>

        </div>
      </div>
      <CategoriesModal
        open={isModalOpen}
        handleClose={handleClose}
        update={update}

      />
      <GlobalTable
        data={tableData}
        columns={columns}
        handleChange={handleTableChange}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ['2', '4', '6', '10']
        }}
      /></>
  );
};

export default Index;
