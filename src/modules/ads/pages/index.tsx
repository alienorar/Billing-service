import { useEffect, useState } from "react";
import { Button, Space} from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalTable, GlobalSearch } from '@components';
import AdsModal from "./modal";
import { ConfirmDelete } from "@components";
import { ParamsType } from "@types";
import { useGetAds } from "../hooks/queries";
import { useDeleteAds } from "../hooks/mutations";

const Index = () => {
    const [tableData, setTableData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [total, setTotal] = useState();
    const { search } = useLocation();
    const { mutate } = useDeleteAds()
    const navigate = useNavigate();
    const [params, setParams] = useState({
        search: "",
        limit: 2,
        page: 1
    });
    const { data } = useGetAds(params)
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
    };

    // ============ get Data ============
    const getData = () => {
        if (data?.data?.data) {
            setTableData(data.data.data)
            setTotal(data.data.data.count)
        }

    };

    useEffect(() => {
        getData();
    },);


    // ======== delete Data ========= 
    const deleteData = async (id: number) => {
        mutate(id)

    };


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString('en-GB').replace(/\//g, '.')
        },
        {
            title: 'Position',
            dataIndex: 'position',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <ConfirmDelete
                        id={record.id}
                        onConfirm={deleteData}
                        onCancel={() => console.log('Cancelled')}
                        title={"Delete this Ad?"}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>

            <AdsModal
                open={isModalOpen}
                handleClose={handleClose}
            />
            <div className="flex items-center justify-between py-4">
                <GlobalSearch updateParams={updateParams} placeholder={"Search Ads"} />
                <div className="flex gap-2 items-center ">
                    <Button type="primary" size="large" style={{ maxWidth: 160, minWidth: 80, backgroundColor: "orangered", color: "white", height: 40 }} onClick={showModal} >
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
