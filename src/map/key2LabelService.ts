export namespace Key2LabelService {
  let key2LableMap = new Map<string, string>([
    ["itemCode", "项目代码"],
    ["diseaseCode", "疾病代码"],
    ["itemName", "项目名称"],
    ["defaultValue", "项目默认值"],
    ["bodyPart", "体检项目关联部位"],
    // 病人的部分
    ["bhkCode", "	体检编号"],
    ["personName", "人员姓名"],
    ["institutionCode", "单位社会信用代码"],
    ["crptName", "单位名称"],
    ["sex", "性别"],
    ["idc", "	身份证号"],
    ["brth", "生日年月日"],
    ["age", "	年龄"],
    ["isXrMd", "婚否"],
    ["lnkTel", "联系电话"],
    ["wrkLnt", "总工龄年数"],
    ["wrkLntMonth", "总工龄月数"],
    ["tchBadRsnTim", "接害工龄年数"],
    ["tchBadRsnMonth", "接害工龄月数"],
    ["bhkDate", "体检日期"],
    ["badRsn", "接触危害因素"],
    ["version", "版本号"],
  ]);

  export const getLabel = (key: string) => {
    return key2LableMap.get(key) || "";
  };
}
