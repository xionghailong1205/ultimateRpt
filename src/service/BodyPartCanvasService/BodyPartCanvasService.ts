import { PatientSex } from "@/api/PatientService";
import { useBodyPartCanvas } from "./BodyPartCanvasStore";

export const BodyPartCanvasService = (function () {
  class BodyPartCanvasService {
    patientSex: PatientSex = "男";
    bodyPartCanvas: string = "bodyPartCanvas";
    canvasWidth: number = 216;
    canvasHeight: number = 480;
    maleBodyImgehref: string = "/bodyPart/body_male.jpg";
    femaleBodyImgehref: string = "/bodyPart/body_female.jpg";
    maleBodyImg = new Image();
    femaleBodyImg = new Image();
    bodyImageWidth = 216;
    bodyImageHeigth = 480;

    constructor() {
      console.log("身体部位 canvas 服务初始化!");
      this.maleBodyImg.src = this.maleBodyImgehref;
      this.femaleBodyImg.src = this.femaleBodyImgehref;
    }

    initBodyPartCanvas(patientSex: PatientSex) {
      const changeBodyPartCanvasState =
        useBodyPartCanvas.getState().changeBodyPartCanvasState;

      console.log(patientSex);
      changeBodyPartCanvasState("afterQuerying");

      setTimeout(() => {
        this.renderBodyPartCanvas();
      }, 100);
    }

    renderBodyPartCanvas() {
      const canvas = document.getElementById(
        this.bodyPartCanvas
      ) as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext("2d")!;

        ctx.drawImage(
          this.maleBodyImg,
          0,
          0,
          this.bodyImageWidth,
          this.bodyImageHeigth
        );

        const testImg = new Image();
        testImg.onload = () => {
          ctx.drawImage(testImg, 94, 88, 15, 20);
        };
        testImg.src = "/bodyPart/thyroid_right.png";
      } else {
        // 执行其他逻辑
        alert("逻辑出现问题");
      }
    }
  }

  return new BodyPartCanvasService();
})();
