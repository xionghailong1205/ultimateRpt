import Cookies from "js-cookie";

export const handleAuthenticationFailure = (reponseCode: number) => {
  if (reponseCode === 401) {
    Cookies.remove("Authorization");
    // @ts-ignore
    window.navigation.reload();
  }
};
