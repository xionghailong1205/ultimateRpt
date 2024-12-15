import config from "./config";

const baseURL = config.apiBaseUrl;

export namespace EntryPatient {
  export const FetchPatientInfoFromMeichiAPI = async ({
    startTime,
    endTime,
  }: {
    startTime: Date;
    endTime: Date;
  }) => {
    let headersList = {
      Accept: "*/*",
    };

    // let response = await fetch(
    //   `${baseURL}/exam/person/query?startTime=2024-12-04T00%3A00%3A00&endTime=2024-12-12T00%3A00%3A00`,
    //   {
    //     method: "GET",
    //     headers: headersList,
    //   }
    // );

    let data = await response.text();
    console.log(data);
  };
}
