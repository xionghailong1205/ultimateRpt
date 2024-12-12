import config from "./config";

const baseURL = config.apiBaseUrl;

export namespace Auth {
  export const Login = async () => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      username: "admin",
      password: "e64b78fc3bc91bcbc7dc232ba8ec59e0",
    });

    let response = await fetch(`${baseURL}/user/login`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    console.log(data);
  };
}
