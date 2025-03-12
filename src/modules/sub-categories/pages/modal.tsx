import { Modal, Form, Input, Button,} from 'antd';
import { useEffect } from 'react';
import { SubCreate, SubModalprops } from '../types';
import { useCreateSubCategory ,useUpdateSubCategory} from '../hooks/mutations';

const SubCategory = ({ open, handleClose, update, parent_category_id }: SubModalprops) => {
    const [form] = Form.useForm();
    const {mutate:createMutate, isPending:isCreating} = useCreateSubCategory()
    const {mutate:updateMutate, isPending:isUpdating} = useUpdateSubCategory()
    useEffect(() => {
        if (update) {
            form.setFieldsValue({
                name: update?.name,
                parent_category_id: Number(update?.parent_category_id),

            })
        } else {
            form.resetFields()
        }
    });

    const onFinish = (values:SubCreate) => {
   if (update?.id) {
    const payload = {...values,id:update?.id}
    updateMutate(payload,{
        onSuccess:()=>{
            handleClose()
        }
    })
   }else{
    const payload = {...values,parent_category_id:parent_category_id}
       createMutate(payload, {
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
                    label=" Sub Category name"
                    name="name"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                    rules={[
                        {
                            required: true,
                            message: 'Enter category name!',
                        },
                    ]}
                >  <Input className='h-10 border-[0.5px] px-3 ' />
                </Form.Item>

              

                <Form.Item>
                    <Button
                        block
                        htmlType="submit"
                        style={{
                            backgroundColor: "#e35112",
                            color: "white",
                            height: "40px",
                            fontSize: "18px",
                            marginTop: "10px",
                        }}
                        loading={isCreating||isUpdating}
                    >
                     {
                        update?.id ? "Update" : "Add"
                     }
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SubCategory;
