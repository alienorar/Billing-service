import { Modal, Form, Input, Button, Select } from "antd";
import { useEffect } from "react";
import { useCreateRoles, useUpdateRoles } from "../hooks/mutations";
import { RoleModalType, RoleType } from "@types";

const { Option } = Select;

const RolesModal = ({ open, handleClose, update, permessionL, selectedPermL }: RoleModalType) => {
  const [form] = Form.useForm();
  const { mutate: createMutate, isPending: isCreating } = useCreateRoles();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateRoles();



  useEffect(() => {
    if (update?.id) {
      form.setFieldsValue({
        id: update.id,
        name: update.name,
        displayName: update.displayName,
        defaultUrl: update.defaultUrl,
        permissions: update.userPermissions?.map(perm => perm.id) || [],
      });
    } else {
      form.resetFields();
    }
  }, [update, form]);

  const onFinish = async (value: RoleType) => {
    const payload: RoleType = {
      id: value?.id,
      name: value?.name,
      displayName: value?.displayName,
      defaultUrl: value?.defaultUrl,
      permissions: value?.permissions || [],
    };

    if (update?.id) {
      updateMutate(payload, { onSuccess: handleClose });
    } else {
      createMutate(payload, { onSuccess: handleClose });
    }
  };

  return (
    <Modal
      title={update?.id ? "Edit Role" : "Add New Role"}
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form
        form={form}
        name="roles_form"
        layout="vertical"
        onFinish={onFinish}
      >
        {update?.id && (
          <Form.Item label="Role ID" name="id">
            <Input disabled style={{ padding: "10px", border: "1px solid #d9d9d9", borderRadius: "6px" }} />
          </Form.Item>
        )}

        <Form.Item
          label="Role Name"
          name="name"
          rules={[{ required: true, message: "Enter role name!" }]}
        >
          <Input style={{ padding: "6px", border: "1px solid #d9d9d9", borderRadius: "6px" }} />
        </Form.Item>

        <Form.Item
          label="Display Name"
          name="displayName"
          rules={[{ required: true, message: "Enter display name!" }]}
        >
          <Input style={{ padding: "6px", border: "1px solid #d9d9d9", borderRadius: "6px" }} />
        </Form.Item>

        <Form.Item
          label="Default URL"
          name="defaultUrl"
          rules={[{ required: true, message: "Enter default URL!" }]}
        >
          <Input style={{ padding: "6px", border: "1px solid #d9d9d9", borderRadius: "6px" }} />
        </Form.Item>

        <Form.Item label="Already Selected Permissions">
          <Input.TextArea
            value={(roleData?.data?.userPermissions ?? [])
              .map(perm => perm.name)
              .join(", ")}
            readOnly
          />
        </Form.Item>

        <Form.Item label="Permissions" name="permissions">
          <Select
            mode="multiple"
            placeholder="Select permissions"
            style={{ padding: "5px", borderRadius: "6px", border: "1px solid #d9d9d9" }}
            optionLabelProp="label"
          >
            {permessionL?.map((perm) => (
              <Option key={perm.id} value={perm.id} label={perm.name}>
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
              borderRadius: "6px",
            }}
          >
            {update?.id ? "Update Role" : "Create Role"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>

  );
};

export default RolesModal;
