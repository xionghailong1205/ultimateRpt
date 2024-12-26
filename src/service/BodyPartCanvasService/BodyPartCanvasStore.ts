import { create } from "zustand";

type BodyPartCanvaState = "waitQuerying" | "afterQuerying";

interface State {
  bodyPartCanvaState: BodyPartCanvaState;
}

interface Action {
  changeBodyPartCanvasState: (newState: BodyPartCanvaState) => void;
}

interface useBodyPartCanvasProp extends State, Action {}

export const useBodyPartCanvas = create<useBodyPartCanvasProp>((set, get) => ({
  bodyPartCanvaState: "afterQuerying",
  changeBodyPartCanvasState(newState) {
    set({
      bodyPartCanvaState: newState,
    });
  },
}));
