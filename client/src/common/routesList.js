import Error404 from "Error404";
import Chat from "modules/chat";
import Dashboard from "modules/dashboard";
import Profile from "modules/profile";
import Restaurants from "modules/restaurants";
import FoodMenu from "modules/admin/menu";
import SpecificRestaurant from "modules/restaurants/components/SpecificRestaurant";
import { MODULES, ROLES, ROUTES } from "./constants";
import UserFoodMenu from "modules/menu";
import ParticularOrder from "modules/orders/components/ParticularOrder";
import MyOrders from "modules/orders";

export const routesList = [
  {
    link: ROUTES.MAIN,
    label: MODULES.DASHBOARD,
    view: Dashboard,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    link: ROUTES.CHAT,
    label: MODULES.CHAT,
    view: Chat,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    link: ROUTES.PROFILE,
    label: MODULES.PROFILE,
    view: Profile,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    link: ROUTES.RESTAURANTS,
    label: MODULES.RESTAURANTS,
    view: Restaurants,
    allowedRoles: [ROLES.USER],
  },
  {
    link: ROUTES.SPECIFIC_RESTAURANT,
    label: MODULES.RESTAURANTS,
    view: SpecificRestaurant,
    allowedRoles: [ROLES.USER],
  },
  {
    link: ROUTES.FOOD_MENU,
    label: MODULES.FOOD_MENU,
    view: FoodMenu,
    allowedRoles: [ROLES.ADMIN],
  },
  {
    link: ROUTES.USER_FOOD_MENU,
    label: MODULES.USER_FOOD_MENU,
    view: UserFoodMenu,
    allowedRoles: [ROLES.USER],
  },
  {
    link: ROUTES.ORDER_PAGE,
    label: MODULES.ORDER_PAGE,
    view: ParticularOrder,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    link: ROUTES.ORDERS,
    label: MODULES.ORDERS,
    view: MyOrders,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    link: "*",
    label: "Error",
    view: Error404,
    allowedRoles: [ROLES.USER, ROLES.ADMIN],
  },
];
