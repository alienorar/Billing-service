import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from 'antd';
import { EditOutlined, } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom'
import { GlobalTable, GlobalSearch } from '@components';
import BrandCategoryModal from '../pages/modal';
import { ConfirmDelete } from "@components";
import { ParamsType } from "@types";
import { useGetBrandcategory, useGetBrands } from "../hooks/queries";
import { useDeleteBrandCategory } from "../hooks/mutations";

const Index = () => {
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [total, setTotal] = useState();
  const [parentBrand, setParentbrand] = useState([]);
  const { search } = useLocation()
  const navigate = useNavigate()
  const { mutate } = useDeleteBrandCategory()
  const [params, setParams] = useState({
    search: "",
    limit: 2,
    page: 1
  })

  //========= SET PARAMS =========
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

  const { data } = useGetBrandcategory(params)
  const { data: parentBrands } = useGetBrands()

  // ============GET DATA ============
  const getData = async () => {
    if (data?.data?.data?.brandCategories) {
      setTableData(data.data.data.brandCategories)
      setTotal(data?.data.data.count)
    }
  };

  useEffect(() => {
    getData();
  },);

  // =========== EDIT DATA ===========
  const editData = (item: any) => {
    setUpdate(item);
    showModal()
  };




  // ======== DELETE DATA ========= 
  const deleteData = async (id: number) => {
    mutate(id)
  };


  //========= GET BRANDS  ============
  const getBrands = async () => {
    if (parentBrands?.data?.data?.brands) {
      setParentbrand(parentBrands.data.data.brands)
      console.log(parentBrand, "hjfhfhe");
    }



  };

  useEffect(() => {
    getBrands();
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Brand category name',
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
      render: (_: any, record: any) => (
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
      <BrandCategoryModal
        open={isModalOpen}
        handleClose={handleClose}
        getData={getData}
        update={update}
        parentBrand={parentBrand}

      />
      <div className="flex items-center justify-between py-4">
        <GlobalSearch updateParams={updateParams} placeholder={"Search Brand Categories"} />
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
          pageSizeOptions: ['2', '3', '4', '6',]
        }}
      />
    </>
  );
};

export default Index;