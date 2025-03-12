import { Form, Input, Button, Select, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { ProductModalProps, ProductType } from '../types';
import { useGetBrand, useGetBrandCategory, useGetCategory } from '../hooks/queries';
import { CategoryType } from '../../categories/types';
import { BrandType } from '../../brands/types';
import { BrandCategoryType } from '../../brand-categories/types';
import { useCreateProducts, useUpdateProducts } from '../hooks/mutations';
const { Option } = Select;

const Index = ({ open, handleClose, update }: ProductModalProps) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState([]);
    const [categoryId, setCategoryId] = useState<number | undefined>();
    const [brandId, setBrandId] = useState<number | undefined>()
    const { categories } = useGetCategory().data?.data?.data || {}
    const { brands } = useGetBrand(categoryId || 0).data || {}
    const { brandCategories } = useGetBrandCategory(brandId || 0).data || {}
    const { mutate: createMutate, isPending: isCreating } = useCreateProducts()
    const { mutate: updateMutate, isPending: isUpdating } = useUpdateProducts()
    // console.log(brands, "ndjkwdkej");


    // ===== GET BRANDS BY CATEGORY ID ======== 
    const handleCategoryChange = (id: number | undefined) => {
        setCategoryId(id)

    }

    // ======== GET BRAND CATEGORY BY BRAND ID ==========
    const handleBrandChange = (id: number | undefined) => {
        setBrandId(id)
    }

    useEffect(() => {
        if (update?.id) {
            form.setFieldsValue({
                name: update?.name,
                price:Number(update?.price),
                category_id: update?.category_id,
                brand_id: update?.brand_id,
                brand_category_id: update?.brand_category_id,
                files: update?.files
            })
        }
        else {
            form.resetFields();
        }
    }, [update, form])



    const handleFileChange = (event: any) => {
        const fileData = event.target.files[0];
        setFile(fileData);
    };

    const onFinish = async (values: ProductType) => {
        const formData: any = new FormData();
        formData.append("name", values?.name);
        formData.append("price",values?.price);
        formData.append("category_id", values?.category_id);
        formData.append("brand_id", values?.brand_id);
        formData.append("brand_category_id", values?.brand_category_id);
        formData.append("files", file);

        if (update?.id) {
            const payload = { ...values, id: update?.id }
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
        <>
            <Drawer onClose={handleClose} open={open} width={600}>
                <h2 className='text-[24px] font-semibold my-3'>Add Product</h2>

                <Form
                    form={form}
                    name="brands_form"
                    style={{ display: "flex", flexDirection: "column", }}
                    onFinish={onFinish}

                >
                    <div className='flex gap-3 '>
                        <Form.Item
                            label="Product name"
                            name="name"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: '8px' }}
                            rules={[
                                { required: true, message: 'Enter product name!' },
                            ]}
                        >
                            <Input className='h-10 p-2 border-[1.4px]' />
                        </Form.Item>
                        <Form.Item
                            label="Product price"
                            name="price"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: '8px' }}
                            rules={[
                                { required: true, message: 'Enter product price!' },
                            ]}
                        >
                            <Input className='h-10 p-2 border-[1.4px]' type='number' />
                        </Form.Item>
                    </div>
                    <div className='flex gap-3 mb-5'>
                        <Form.Item
                            name="category_id"
                            label=" Select Category"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 8, height: 40, width: "100%", border: "2px", borderColor: "gray" }}
                            rules={[
                                { required: true, message: 'Select category!' },
                            ]}


                        >
                            <Select
                                showSearch
                                className='border-[1.4px] rounded-lg h-10 '
                                onChange={(evt => handleCategoryChange(evt))}
                            >
                                {categories?.map((item: CategoryType, index: number) => (
                                    <Option value={item.id} key={index}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="brand_id"
                            label="Select Brand"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ height: "40px", width: "100%" }}
                            rules={[
                                { required: true, message: 'Select Brand!' },
                            ]}
                        >
                            <Select
                                className='border-[1.4px] rounded-lg h-10 '
                                onChange={(value) => handleBrandChange(value)}
                                disabled={!categoryId}
                            >
                                {brands?.map((item: BrandType, index: number) => (
                                    <Option value={item.id} key={index}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </div>
                    <div className='grid grid-cols-2 gap-3 mb-5 mt-4' >
                        <Form.Item
                            name="brand_category_id"
                            label="Select Brand  Category"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ height: 40, }}
                            rules={[
                                { required: true, message: 'Select Brand category!' },
                            ]}
                        >
                            <Select
                                className='border-[1.4px] rounded-lg h-10 '
                                disabled={!brandId}
                            >
                                {brandCategories?.map((item: BrandCategoryType, index: number) => (
                                    <Option value={item.id} key={index}>
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
                                    rules={[
                                        { required: true, message: 'Upload file!' },
                                    ]}>
                                    <input type="file" height={80} onChange={handleFileChange} />
                                </Form.Item>
                        }
                    </div>

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
                            Add
                        </Button>
                    </Form.Item>
                </Form>

            </Drawer>
        </>
    );
};

export default Index;
