export interface BodyPartInfo {
  imgName: string;
  labelName: string;
}

// 简单的 Map 之后可能会扩展
export let LeftBodyPartMap = new Map<string, BodyPartInfo>([
  // 左侧部分
  [
    "leftThyroid",
    {
      labelName: "甲状腺左侧",
      imgName: "thyroid_left",
    },
  ],
  [
    "leftBreast",
    {
      labelName: "左乳腺",
      imgName: "breast_left",
    },
  ],
  [
    "heart",
    {
      labelName: "心脏",
      imgName: "heart",
    },
  ],
  [
    "spleen",
    {
      labelName: "脾脏",
      imgName: "spleen",
    },
  ],
  [
    "pancreas",
    {
      labelName: "胰腺",
      imgName: "pancreas",
    },
  ],
  [
    "leftKidney",
    {
      labelName: "左肾",
      imgName: "kidney_left",
    },
  ],
  [
    "prostate",
    {
      labelName: "前列腺",
      imgName: "prostate",
    },
  ],
  [
    "leftAttachment",
    {
      labelName: "左附件",
      imgName: "attachment_left",
    },
  ],
]);

export let RightBodyPartMap = new Map<string, BodyPartInfo>([
  // 右侧部分
  [
    "rightThyroid",
    {
      labelName: "甲状腺右侧",
      imgName: "thyroid_right",
    },
  ],
  [
    "leftBreast",
    {
      labelName: "右乳腺",
      imgName: "breast_right",
    },
  ],
  [
    "mildFattyLiver",
    {
      labelName: "轻度脂肪肝",
      imgName: "mild_fattyliver",
    },
  ],
  [
    "gallBladder",
    {
      labelName: "胆囊",
      imgName: "gallbladder",
    },
  ],
  [
    "rightKidney",
    {
      labelName: "右肾",
      imgName: "kidney_right",
    },
  ],
  [
    "ureter",
    {
      labelName: "输尿管、膀胱",
      imgName: "ureter",
    },
  ],
  [
    "rightAttachment",
    {
      labelName: "右附件",
      imgName: "attachment_right",
    },
  ],
]);
