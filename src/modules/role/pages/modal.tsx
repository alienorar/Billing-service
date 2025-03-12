import { Modal, Form, Input, Button, Select } from "antd";
import { useEffect, useState } from "react";
import { BrandModalProps, BrandType } from "../types";
import { useCreateBrands, useCreateRoles, useUpdateBrands } from "../hooks/mutations";

const { Option } = Select;

const RolesModal = ({ open, handleClose, update, permessionL }: BrandModalProps) => {
  const [form] = Form.useForm();
  const { mutate: createMutate, isPending: isCreating } = useCreateRoles();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateBrands();

  useEffect(() => {
    if (update?.id) {
      form.setFieldsValue({
        name: update?.name,
        displayName: update?.displayName,
        defaultUrl: update?.defaultUrl,
        permissions: update?.permissions || [],
      });
    } else {
      form.resetFields();
    }
  }, [update, form]);

  const onFinish = async (value: BrandType) => {
    const payload: BrandType = {
      name: value?.name,
      displayName: value?.displayName,
      defaultUrl: value?.defaultUrl,
      permissions: value?.permissions || [],
    };

    if (update?.id) {
      updateMutate({ ...payload, id: update?.id }, { onSuccess: handleClose });
    } else {
      createMutate(payload, { onSuccess: handleClose });
    }
  };

  return (
    <Modal title="Add New Role" open={open} onCancel={handleClose} footer={null}>
      <Form form={form} name="roles_form" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Role Name"
          name="name"
          rules={[{ required: true, message: "Enter role name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Display Name"
          name="displayName"
          rules={[{ required: true, message: "Enter display name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Default URL"
          name="defaultUrl"
          rules={[{ required: true, message: "Enter default URL!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Permissions" name="permissions">
          <Select mode="multiple" placeholder="Select permissions">
            {permessionL?.map((perm: any) => (
              <Option key={perm.id} value={perm.id}>
                {perm.name}
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
              backgroundColor: "#1E9FD9",
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

export default RolesModal;
