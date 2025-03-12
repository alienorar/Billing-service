import { Modal, Form, Input, Button} from 'antd';
import { useState } from 'react';
import { useCreateAds } from '../hooks/mutations';
import { CreateAds } from '../types';

const AdsModal = ({ open, handleClose }: any) => {
    const [form] = Form.useForm();
    const { mutate: createMutate, isPending: isCreating } = useCreateAds()
    const [file, setFile] = useState([]);

    const handleChange = (e: any) => {
        let fileData = e.target.files[0]
        setFile(fileData);
    };

    const onFinish = async (value:CreateAds) => {
        let formData: any = new FormData();
        formData.append("position", value?.position);
        formData.append("file", file);
        createMutate(formData, {
            onSuccess: () => {
                handleClose()
            }
        })

    };

    return (
        <Modal
            title="Add New Ads"
            open={open}
            onCancel={handleClose}
            footer={null}

        >
            <Form
                form={form}
                name="ads_form"
                style={{ display: "flex", flexDirection: "column" }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="position"
                    name="position"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                    rules={[
                        { required: true, message: 'Enter  Ads position!' },
                    ]}
                >
                    <Input className='h-10 border-[0.5px] px-3 ' />
                </Form.Item>

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


                <Form.Item>
                    <Button
                        block
                        htmlType="submit"
                        loading={isCreating}
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

export default AdsModal;
