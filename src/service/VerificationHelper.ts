export namespace VerificationHelper {
  export const makeSureNotEmpty = (value: any) => {
    return !value ? "不能为空" : undefined;
  };
}
