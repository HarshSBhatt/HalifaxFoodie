import { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Form, Checkbox } from "antd";
import { REGEX } from "common/constants";
import api from "common/api";
import { AppContext } from "AppContext";
import { toast } from "common/utils";

function AddItem() {
  const {
    state: { userId },
  } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [featured, setFeatured] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const onCheckboxChange = (e) => {
    setFeatured(e.target.checked);
  };

  const handleDishCreate = async (values) => {
    values.featured = featured;
    setConfirmLoading(true);
    try {
      const response = await api.post(
        `/food-item/restaurant/${userId}`,
        values
      );
      const { data } = response;
      toast({
        message: data.message,
        type: "success",
      });
      setVisible(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      toast({
        message: err.response.data.message,
        type: "error",
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        handleDishCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const title = <span className="sdp-text-strong">Add new food item</span>;

  return (
    <div className="add-item">
      <Button icon={<PlusOutlined />} onClick={showModal} type="primary">
        Add Dish
      </Button>
      <Modal
        title={title}
        centered
        visible={visible}
        onOk={handleOk}
        okText="Add Item"
        closable={false}
        keyboard={false}
        maskClosable={false}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelButtonProps={{ disabled: confirmLoading }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="itemName"
            label="Dish Name"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
              {
                pattern: REGEX.NUMBER,
                message: "Price must be a number",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="recipe"
            label="Recipe"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="ingredients"
            label="Ingredients"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="preparationTime"
            label="Preparation Time"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
              {
                pattern: REGEX.NUMBER,
                message: "Price must be a number",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Checkbox checked={featured} onChange={onCheckboxChange}>
              Featured
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddItem;
