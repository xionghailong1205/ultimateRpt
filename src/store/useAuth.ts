import { create } from "zustand";
import * as cookieHelper from "cookie";
import { AccountInfo, Auth } from "@/api/Auth";
import { md5 } from "js-md5";

interface State {
  // 'Authorization=9e1c96d0-c4ca-402f-9c21-4417dac9e4fc'
  Authorization: string | undefined;
}

export const getAuthorizationCookie = () => {
  const cookie = document.cookie;
  const { Authorization } = cookieHelper.parse(cookie);

  return Authorization;
};

interface LoginResult {
  code: number;
  msg: string;
}

interface Action {
  logIn: (accountInfo: AccountInfo) => Promise<LoginResult>;
}

interface AuthProp extends State, Action {}

export const useAuth = create<AuthProp>((set, get) => ({
  Authorization: getAuthorizationCookie(),
  async logIn(accountInfo) {
    const { username, password } = accountInfo;

    const loginResult = (await Auth.Login({
      username,
      password: md5(password),
    })) as LoginResult;

    console.log(loginResult);

    const Authorization = getAuthorizationCookie();

    if (loginResult.code === 200) {
      set({
        Authorization,
      });
    }

    return loginResult;
  },
}));
