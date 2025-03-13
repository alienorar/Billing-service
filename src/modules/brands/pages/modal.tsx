import { Modal, Form, Input, Button, Select } from 'antd';
import { useEffect, useState } from 'react';
import { BrandModalProps, BrandType } from '../types';
import { useCreateBrands, useUpdateBrands } from '../hooks/mutations';

const { Option } = Select;

const BrandsModal = ({ open, handleClose, update, categories }: BrandModalProps) => {
    const [form] = Form.useForm();
    const { mutate: createMutate, isPending: isCreating } = useCreateBrands()
    const { mutate: updateMutate, isPending: isUpdating } = useUpdateBrands()


    useEffect(() => {
        if (update?.id) {
            form.setFieldsValue({
                name: update?.name,
                description: update?.description,
                categoryId: update?.category_id
            });
        } else {
            form.resetFields();
        }
    }, [update, form]);

    const [file, setFile] = useState([]);
    const handleChange = (e: any) => {
        let fileData = e.target.files[0]
        setFile(fileData);
    };


    const onFinish = async (value: BrandType) => {
        const demo: BrandType = {
            name: value?.name,
            description: value?.description,
            categoryId: value?.category_id
        }


        let formData: any = new FormData();
        formData.append("name", value?.name);
        formData.append("categoryId", value?.category_id);
        formData.append("description", value?.description);
        formData.append("file", file);

        if (update?.id) {
            const payload = { ...demo, id: update?.id }
            updateMutate(payload, {
                onSuccess: () => {
                    handleClose()
                }
            })
        } else {
            createMutate(formData, {
                onSuccess: () => {
                    handleClose()
                }
            })
        }
    };

    return (
        <Modal
            title="Add New Brand"
            open={open}
            onCancel={handleClose}
            footer={null}

        >
            <Form
                form={form}
                name="brands_form"
                style={{ display: "flex", flexDirection: "column" }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Brand name"
                    name="name"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                    rules={[
                        { required: true, message: 'Enter Brand name!' },
                    ]}
                >
                    <Input className='h-10 border-[0.5px] px-3 ' />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                    rules={[
                        { required: true, message: 'Enter Description!' },
                    ]}
                >
                    <Input className='h-10 border-[0.5px] px-3 ' />
                </Form.Item>

                <Form.Item
                    name="categoryId"
                    label="Category"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: '8px' }}
                    rules={[
                        { required: true, message: 'Enter Brand name!' },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Select a Category"
                    >
                        {categories?.map((item: any, index: number) => (
                            <Option value={parseInt(item.id)} key={index}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {
                    update?.id ? "" :
                        <Form.Item
                            name="file"
                            label="File"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 8 }}
                            rules={[
                                { required: true, message: 'Upload file!' },
                            ]}>
                            <input type="file" onChange={handleChange} />
                        </Form.Item>
                }

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
                            marginTop: "10px",
                        }}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BrandsModal;
