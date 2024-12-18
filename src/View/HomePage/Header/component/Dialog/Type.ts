import { ResultTableState } from "./component/ResultTable";

export interface DialogTableProp<T> {
  pageSize: number;
  currentPage: number;
  totalCount: number;
  navToPage: Function;
  navToPageSize: Function;
  currentPageData: Array<T>;
  resultTableState: ResultTableState;
}
