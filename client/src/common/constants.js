/* ROUTERS  */
export const ROUTES = {
  MAIN: "/",
  LOGIN: "/login",
  SECURITY_QUESTION: "/security-question",
  LOGOUT: "/logout",
  REGISTER: "/register",
  ADMIN_REGISTER: "/restaurant-signup",
  FORGET_PASSWORD: "/forget-password",
  CHAT: "/chat",
  PROFILE: "/profile",
};

/*  Modules */
export const MODULES = {
  DASHBOARD: "Dashboard",
  CHAT: "Chat",
  PROFILE: "Profile",
};

/* Authentication */
export const TOKEN = "TOKEN";
export const USER = "USER";
export const ADMIN = "ADMIN";
export const USER_ID = "USER_ID";
export const IMAGE_URL = "IMAGE_URL";
export const ROLE = "ROLE";

/* Errors */

export const SERVER_ERROR = "SERVER_ERROR";

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

/* Date and time */
export const defaultDateFormat = "MM/DD/YYYY";

export const REGEX = {
  NAME: /^[a-z ,.'-]+$/i,
  ZIPCODE: /^[0-9]{5,6}$/,
  CITY: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
  WEB_URL:
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
  PASSWORD: /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
  PHONE: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  EMAIL: /^[a-z0-9.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  AMOUNT: /^\d+$|^\d+\.\d*$/,
  OPTIONALNEGATIVEAMOUNT: /^[-]?\d+$|^[-]?\d+\.\d*$/,
  NUMBER: /^\d+$/,
};
