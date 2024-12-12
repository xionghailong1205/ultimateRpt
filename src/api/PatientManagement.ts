import config from "./config";

const baseURL = config.apiBaseUrl;

export namespace PatientManagement {
  export const getPatientList = async () => {
    let headersList = {
      Accept: "*/*",
    };

    let response = await fetch(
      `${baseURL}/exam/person/page?pageSize=10&pageNum=1`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    let data = await response.json();
    console.log(data);
  };
}
