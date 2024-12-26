import { BodyPartService } from "../BodyPartService";

export const BodyPartRenderService = (function () {
  class BodyPartRenderService {
    constructor() {
      let bodyImgList = BodyPartService.getBodyImgList();
      console.log(bodyImgList);
    }
  }

  return BodyPartRenderService;
})();
