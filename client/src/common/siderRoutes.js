//! Ant Icons

import {
  UserOutlined,
  AppstoreOutlined,
  WechatOutlined,
} from "@ant-design/icons";

//! User Files

import { ROLES, ROUTES } from "./constants";

export const rootSubMenuKeys = ["Dashboard", "Profile", "Chat"];

export const siderMenu = {
  Dashboard: {
    link: ROUTES.MAIN,
    label: "Dashboard",
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
    icon: <AppstoreOutlined />,
  },
  Profile: {
    link: ROUTES.PROFILE,
    label: "My Profile",
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
    icon: <UserOutlined />,
  },
  Chat: {
    link: ROUTES.CHAT,
    label: "Chat",
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
    icon: <WechatOutlined />,
  },
};
