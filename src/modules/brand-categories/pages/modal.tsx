
import { Modal, Form, Input, Button, Select } from 'antd';
import { useEffect } from 'react';
import { BrandCategoryModal, BrandCategoryType } from '../types';
import { useCreateBrandCategory, useUpdateBrandCategory } from '../hooks/mutations';
const { Option } = Select;

const Index = ({ open, handleClose, update, parentBrand, }: BrandCategoryModal) => {
    const [form] = Form.useForm();
    const { mutate: createMutate, isPending: isCreating } = useCreateBrandCategory()
    const { mutate: updateMutate, isPending: isUpdating } = useUpdateBrandCategory()
    useEffect(() => {
        if (update) {
            form.setFieldsValue({
                name: update?.name || "",
                brand_id: update?.brand_id,
            })
        } else {
            form.resetFields()
        }
    });
    const onFinish = async (values: BrandCategoryType) => {
        if (update?.id) {
            const payload = { ...values, id: update?.id }
            updateMutate(payload, {
                onSuccess: () => {
                    handleClose()
                }
            })
        } else {
            createMutate(values, {
                onSuccess: () => {
                    handleClose()
                }
            })
        }

    };

    return (
        <Modal
            title="Add Brand Category"
            open={open}
            onCancel={handleClose}
            footer={null}
        >
            <Form
                form={form}
                name="brand_category_form"
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label=" Brand category name"
                    name="name"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                    rules={[
                        {
                            required: true,
                            message: 'Enter brand category name!',
                        },
                    ]}
                >
                    <Input className='h-10 p-3 border-[1.3px]' placeholder="Enter Category Name" />
                </Form.Item>

                <Form.Item
                    name="brand_id"
                    label="Parent brand"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}

                    rules={[
                        {
                            required: true,
                            message: 'Enter brand  name!',
                        },
                    ]}>
                    <Select
                        showSearch
                        className=' border-[1.3px] h-10 rounded-lg'
                        placeholder="Select a Brand"
                    >
                        {parentBrand?.map((item: any, index: number) => (
                            <Option value={parseInt(item.id)} key={index}>
                                {item.name}
                            </Option>

                        ))}

                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button
                        block
                        htmlType="submit"
                        loading={isCreating || isUpdating}
                        style={{
                            backgroundColor: "#e35112",
                            color: "white",
                            height: "40px",
                            fontSize: "18px",
                            marginTop: "20px",
                        }}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Index;