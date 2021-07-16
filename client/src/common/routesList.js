import Error404 from "Error404";
import Chat from "modules/chat";
import Dashboard from "modules/dashboard";
import Profile from "modules/profile";
import { ROLES, ROUTES } from "./constants";

export const routesList = [
  {
    link: ROUTES.MAIN,
    label: "Dashboard",
    view: Dashboard,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    link: ROUTES.CHAT,
    label: "Chat",
    view: Chat,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    link: ROUTES.PROFILE,
    label: "Profile",
    view: Profile,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    link: "*",
    label: "Error",
    view: Error404,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
];
