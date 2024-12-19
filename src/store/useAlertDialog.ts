import { create } from "zustand";

interface DialogContent {
  dialogTitle: string;
  dialogDescription: string;
}

interface State {
  whetherOpen: boolean;
  dialogContent: DialogContent;
}

interface Action {
  openDialog: (dialogContent: DialogContent) => void;
  closeDialog: () => void;
}

interface useAlertDialogProp extends State, Action {}

export const useAlertDialog = create<useAlertDialogProp>((set, get) => ({
  whetherOpen: false,
  dialogContent: {
    dialogTitle: "default",
    dialogDescription: "default",
  },
  openDialog(dialogContent) {
    set({
      dialogContent,
    });
    setTimeout(() => {
      set({
        whetherOpen: true,
      });
    }, 100);
  },
  closeDialog() {
    set({
      whetherOpen: false,
    });
    setTimeout(() => {
      set({
        dialogContent: {
          dialogDescription: "",
          dialogTitle: "",
        },
      });
    }, 1000);
  },
}));
