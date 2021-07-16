//! Ant Icons

import {
  UserOutlined,
  AppstoreOutlined,
  WechatOutlined,
  ShopOutlined,
} from "@ant-design/icons";

//! User Files

import { MODULES, ROLES, ROUTES } from "./constants";

export const rootSubMenuKeys = ["Dashboard", "Profile", "Chat", "Restaurants"];

export const siderMenu = {
  Dashboard: {
    link: ROUTES.MAIN,
    label: MODULES.DASHBOARD,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
    icon: <AppstoreOutlined />,
  },
  Profile: {
    link: ROUTES.PROFILE,
    label: MODULES.PROFILE,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
    icon: <UserOutlined />,
  },
  Chat: {
    link: ROUTES.CHAT,
    label: MODULES.CHAT,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
    icon: <WechatOutlined />,
  },
  Restaurants: {
    link: ROUTES.RESTAURANTS,
    label: MODULES.RESTAURANTS,
    allowedRoles: [ROLES.USER],
    icon: <ShopOutlined />,
  },
};
