import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from 'antd';
import { EditOutlined, } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalTable, GlobalSearch } from '@components';
import BrandsModal from '../pages/modal'
import { ConfirmDelete } from "@components";
import { ParamsType } from "@types";
import { useGetBrands, useGetCategory } from "../hooks/queries";
import { BrandType } from "../types";
import { useDeleteBrands } from "../hooks/mutations";

const Index = () => {
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const { data: category } = useGetCategory()
  const { search } = useLocation();
  const [categories, setCategories] = useState([]);
  const { mutate } = useDeleteBrands()
  const [params, setParams] = useState({
    search: "",
    limit: 2,
    page: 1
  });
  const { data } = useGetBrands(params)
  useEffect(() => {
    const params = new URLSearchParams(search);
    let page = Number(params.get("page")) || 1;
    let limit = Number(params.get("limit")) || 2;
    let search_value = params.get("search") || "";
    setParams((prev) => ({
      ...prev,
      limit: limit,
      page: page,
      search: search_value,
    }));
  }, [search]);

  // ============ Table ==============
  const handleTableChange = (pagination: any) => {
    console.log(pagination, "page");

    const { current, pageSize } = pagination;
    setParams((prev) => ({
      ...prev,
      limit: pageSize,
      page: current,
    }));

    const searchParams = new URLSearchParams(search);
    searchParams.set("page", `${current}`);
    searchParams.set('limit', `${pageSize}`);
    navigate(`?${searchParams}`);
  };

  const updateParams = (newParams: ParamsType) => {
    setParams((prev) => ({
      ...prev,
      ...newParams
    }));
  };

  // ============ Modal ===========
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setUpdate({});
  };

  // ============ get Data ============
  const getData = () => {
    if (data?.data?.data?.brands) {
      setTableData(data?.data?.data?.brands)
      setTotal(data.data.data.count)
    }

  };

  useEffect(() => {
    getData();
  },);

  // =========== edit Data ===========
  const editData = (item: BrandType) => {
    setUpdate(item);
    showModal();
  };

  // ======== delete Data ========= 
  const deleteData = async (id: number) => {
    mutate(id)

  };

  // ========= get categories ============
  const getCategories = async () => {
    if (category?.data?.data?.categories) {
      setCategories(category?.data?.data?.categories)
    }
  };

  useEffect(() => {
    getCategories();
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Brand name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Tooltip title="edit"><Button onClick={() => editData(record)}><EditOutlined /></Button></Tooltip>
          <ConfirmDelete
            id={record.id}
            onConfirm={deleteData}
            onCancel={() => console.log('Cancelled')}
            title={"Delete this Brands ?"}
          />
        </Space>
      ),
    },
  ];

  return (
    <>

      <BrandsModal
        open={isModalOpen}
        handleClose={handleClose}
        update={update}
        categories={categories}
      />
      <div className="flex items-center justify-between py-4">
        <GlobalSearch updateParams={updateParams} placeholder={"Search Brands"} />
        <div className="flex gap-2 items-center ">
          <Button type="primary" size="large" style={{ maxWidth: 160, minWidth: 80, backgroundColor: "orangered", color: "white", height: 40 }} onClick={showModal}>
            Create
          </Button>
        </div>
      </div>
      <GlobalTable
        data={tableData}
        columns={columns}
        handleChange={handleTableChange}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ['2', '3', '4', '6']
        }}
      />
    </>

  );
};

export default Index;
