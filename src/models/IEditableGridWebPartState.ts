export interface IData {
  id: string;
  customerhovercol: string;
  name: string;
  age: Number;
  designation: string;
  salary: Number;
  dateofjoining: string;
  payrolltype: string;
  employmenttype: string;
}

export interface IEditableGridWebPartState {
  items: IData[];
}
