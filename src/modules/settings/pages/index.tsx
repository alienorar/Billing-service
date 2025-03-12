import { Card, Avatar, Typography, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useGetSettings } from "../hooks/queries";

const { Text } = Typography;

const Index = () => {
    const [tableData, setTableData] = useState(null);
    const dataKey = [
        { label: "First name", key: "first_name" },
        { label: "Email", key: "email" },
        { label: "Last name", key: "last_name" },
        { label: "Phone number", key: "phone_number" },
    ];
    const id = Number(localStorage.getItem("id"));
    const { data } = useGetSettings(id);

    useEffect(() => {
        if (data?.data?.data) {
            setTableData(data.data.data);
        }
    }, [data]);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                marginTop: 40,
            }}
        >
            <Card
                style={{
                    width: "100%",
                }}
            >
                <Row
                    gutter={16}
                    align="middle"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                    }}
                >
                    <Col
                        span={6}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <Avatar size={200} icon={<UserOutlined />} />
                    </Col>
                    <Col span={18}>
                        <Row gutter={[16, 16]}>
                            {dataKey.map((item, index) => (
                                <Col span={12} key={index}>
                                    <Text style={{ fontSize: "16px", fontWeight: "small" }}>
                                        {item.label}
                                    </Text>
                                    <br />
                                    <Text style={{ fontSize: "24px" }}>
                                        {tableData ? tableData[item.key] : "Loading..."}
                                    </Text>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default Index;
