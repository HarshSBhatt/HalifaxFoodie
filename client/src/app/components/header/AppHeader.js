import { useState } from "react";
import { useHistory } from "react-router-dom";

//! Ant Imports

import { Button, Typography, Layout } from "antd";

//! Ant Icons

import { ShoppingCartOutlined } from "@ant-design/icons";

//! User Files

import { ROUTES } from "common/constants";
import MyCartDrawer from "modules/food_items/components/MyCartDrawer";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
  const { push } = useHistory();
  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    push(ROUTES.LOGOUT);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Header>
        <Title level={4}>HalifaxFoodie</Title>
        <div>
          <Button
            className="mx-8"
            icon={<ShoppingCartOutlined />}
            type="ghost"
            onClick={showDrawer}
          />
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </Header>

      <MyCartDrawer onClose={onClose} visible={visible} />
    </>
  );
};

export default AppHeader;
