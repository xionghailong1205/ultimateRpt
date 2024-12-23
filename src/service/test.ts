export type InputType = "input" | "selector" | "textarea";

export interface TableSchema<T> {
  key: T;
  label: string;
  type: InputType;
}

export namespace TableSchemaService {
  export const getInputSpanInTable = (type: InputType): string => {
    switch (type) {
      case "input": {
        return "span 1";
      }
      case "selector": {
        return "span 1";
      }
      case "textarea": {
        return "1 / span 2";
      }
    }
  };

  export const getInputHeight = (type: InputType): string => {
    switch (type) {
      case "input": {
        return "h-[--normal-input-height]";
      }
      case "selector": {
        return "h-[--normal-input-height]";
      }
      case "textarea": {
        return "h-[--textare-input-height]";
      }
    }
  };
}
