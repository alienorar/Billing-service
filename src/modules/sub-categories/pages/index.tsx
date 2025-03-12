import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from 'antd';
import { EditOutlined, } from '@ant-design/icons';
import { useNavigate, NavLink, useParams, useLocation } from 'react-router-dom'
import { GlobalTable, GlobalSearch } from '@components';
import { ConfirmDelete } from "@components";
import SubCategory from './modal'
import { ParamsType } from "@types";
import { useGetSubCategory } from "../hooks/queries";


const Index = () => {
    const { id } = useParams();
    const parent_category_id = Number(id)
    const [tableData, setTableData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [update, setUpdate] = useState({});
    const [total, setTotal] = useState(0);
    const { search } = useLocation()
    const { data } = useGetSubCategory(parent_category_id)
    const navigate = useNavigate()
    const [params, setParams] = useState({
        search: "",
        limit: 2,
        page: 1
    })

    //========= get from query =========
    useEffect(() => {
        const params = new URLSearchParams(search)
        let page = Number(params.get("page")) || 1
        let limit = Number(params.get("limit")) || 2
        let search_value = params.get("search") || "";
        setParams((prev) => ({
            ...prev,
            limit: limit,
            page: page,
            search: search_value,
        }))
    }, [search])



    // ============ Table ==============
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


    // ============ GET SUB CATEGORIES ============
    const getData = async () => {
        if (data?.data?.data?.subcategories) {
            setTableData(data.data.data.subcategories);
            setTotal(data.data.data.count)
        }
    }

    useEffect(() => {
        getData();
    });

    // ===========EDIT DATA ===========
    const editData = (item: any) => {
        setUpdate(item);
        showModal()

    };


    // ========DELETE DATA =========
    const deleteData = async (id: number | string) => {
        console.log("delete", id);

    };


    const columns = [
        {
            title: '№',
            dataIndex: 'id',
        },
        {
            title: ' Category name',
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
                    <Tooltip title="edit"><Button onClick={() => editData(record)}><EditOutlined className="text-[18px]" /></Button></Tooltip>
                    <ConfirmDelete
                        id={record.id}
                        onConfirm={deleteData}
                        onCancel={() => console.log('Cancelled')}
                        title={"Delete this Stock ?"}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <SubCategory
                open={isModalOpen}
                handleClose={handleClose}
                update={update}
                parent_category_id={parent_category_id}
            />
            <div className="flex items-center justify-between py-4">
                <GlobalSearch updateParams={updateParams} placeholder={"Search Categories"} />
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
            <NavLink to={"/admin-panel/categories"} style={{ color: "orangered", width: "100px", padding: "9px", borderRadius: "10px", fontSize: "18px", textDecorationLine: "underline", marginTop: "20px" }} > Back to Categories</NavLink>
        </>
    );
};

export default Index;
