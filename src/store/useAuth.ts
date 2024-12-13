import { create } from "zustand";
import * as cookieHelper from "cookie";

interface State {
  // 'Authorization=9e1c96d0-c4ca-402f-9c21-4417dac9e4fc'
  Authorization: string | undefined;
}

export const getAuthorizationCookie = () => {
  const cookie = document.cookie;
  const { Authorization } = cookieHelper.parse(cookie);

  return Authorization;
};

interface Action {}

interface AuthProp extends State, Action {}

export const useAuth = create<AuthProp>((set, get) => ({
  Authorization: getAuthorizationCookie(),
}));
