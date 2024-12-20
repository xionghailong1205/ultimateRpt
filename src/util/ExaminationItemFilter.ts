import { ExaminationResult } from "@/api/RetrievePatient";

// 因为有些检查不在超声体检的范围内, 所以需要通过这个列表做筛选
export namespace ExaminationItemHelper {
  const itemCodeInUltimateSoundExamination = [
    "00020041",
    "00070001",
    "000700010",
    "000700011",
    "000700012",
    "000700013",
    "000700014",
    "000700015",
    "000700016",
    "000700017",
    "000700018",
    "00070002",
    "000700021",
    "000700022",
    "00070003",
    "00070014",
    "00070016",
    "00070033",
    "00070034",
    "00070035",
    "00070038",
    "00070039",
    "00070040",
    "00070045",
    "00070048",
    "00070050",
    "00070201",
    "00070202",
    "00070204",
    "00070205",
    "A000019",
    "X00107",
    "X00110",
    "X00226",
  ];

  const isUltimateSoundExamination = (itemCodeForCheck: string) => {
    const result = itemCodeInUltimateSoundExamination.findIndex((itemCode) => {
      return itemCodeForCheck === itemCode;
    });

    return result > 0;
  };

  export const getItemCodeInUltimateSoundExaminationList = (
    examResultList: Array<ExaminationResult>
  ) => {
    const itemCodeInSoundExamination = examResultList.filter((examRst) => {
      return isUltimateSoundExamination(examRst.itemCode);
    });

    return itemCodeInSoundExamination;
  };

  // export
}
