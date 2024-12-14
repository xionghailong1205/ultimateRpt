import config from "./config";

const baseURL = config.apiBaseUrl;

export interface AccountInfo {
  username: string;
  password: string;
}

export namespace Auth {
  export const Login = async ({ username, password }: AccountInfo) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      username,
      password,
    });

    let response = await fetch(`${baseURL}/user/login`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let result = await response.json();

    return result;
  };
}
