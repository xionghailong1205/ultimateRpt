export const handleServerError = (responseCode: number) => {
  if (responseCode === 500) {
    alert("服务器运行出现问题!");
  }
};
