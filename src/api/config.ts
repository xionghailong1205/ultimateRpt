const baseURL =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":" +
  window.location.port;

const config = {
  apiBaseUrl: `${baseURL}/api`,
};

export default config;
