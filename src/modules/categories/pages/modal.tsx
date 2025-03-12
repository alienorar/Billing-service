import { Modal, Form, Input, Button, } from 'antd';
import { useEffect } from 'react';
import { CategoryModal, CategoryType } from '../types';
import { useCreateCategory, useUpdateCategory } from '../hooks/mutations';


const CategoriesModal = ({ open, handleClose, update, }: CategoryModal) => {
    const [form] = Form.useForm();
    const { mutate: createMutate, isPending: isCreating } = useCreateCategory();
    const { mutate: updateMutate, isPending: isUpdating } = useUpdateCategory();

    useEffect(() => {
        if (update) {
            form.setFieldsValue({
                name: update.name,
            })
        } else {
            form.resetFields()
        }
    }, [open, update, form])

    const onFinish = (values: CategoryType) => {
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
            title="Add New Category"
            open={open}
            onCancel={handleClose}
            footer={null}
        >
            <Form
                form={form}
                name="category_form"
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Category name"
                    name="name"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8, }}
                    // className='h-10'
                    rules={[
                        {
                            required: true,
                            message: 'Enter category name!',
                        },
                    ]}
                >
                    <Input className='h-10 border-[0.5px] ' />
                </Form.Item>

                <Form.Item>
                    <Button
                        block
                        htmlType="submit"
                        style={{
                            backgroundColor: "#e35112",
                            color: "white",
                            height: 40,
                            fontSize: "18px",
                            marginTop: 10,

                        }}
                        loading={isCreating || isUpdating}
                    >
                        {
                            update.id ? "Updata" : "Add"
                        }
                    </Button>
                </Form.Item>
            </Form>
        </Modal >
    );
};

export default CategoriesModal;
