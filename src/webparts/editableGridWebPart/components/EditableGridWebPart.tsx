import * as React from "react";
import styles from "./EditableGridWebPart.module.scss";
import { IEditableGridWebPartProps } from "./IEditableGridWebPartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  EditableGrid,
  EditControlType,
  IColumnConfig,
  EventEmitter,
  EventType,
  NumberAndDateOperators,
  StringOperators,
} from "fluentui-editable-grid";
import { IEditableGridWebPartState } from "../../../models/IEditableGridWebPartState";
import {
  DetailsListLayoutMode,
  mergeStyleSets,
  ScrollablePane,
  ScrollbarVisibility,
  SelectionMode,
} from "office-ui-fabric-react";

const classNames = mergeStyleSets({
  wrapper: {
    height: "500px",
    position: "relative",
    marginTop: "10px",
  },
  filter: {
    paddingBottom: 20,
    maxWidth: 300,
  },
  header: {
    margin: 0,
  },
  row: {
    display: "inline-block",
  },
  textRight: {
    textAlign: "right",
  },
  textCenter: {
    textAlign: "center",
  },
  countLabel: {
    fontSize: "12px",
    fontWeight: 400,
    color: "#666666",
    paddingLeft: "8px",
  },
  exportButton: {
    fontSize: "12px",
    fontWeight: 600,
    backgroundColor: "#cf2d27",
    border: "1px solid #CF2D27",
    color: "#ffffff",
    textDecoration: "none",
    marginRight: "8px",
    paddingTop: "8px",
    paddingRight: "16px",
    paddingBottom: "8px",
    paddingLeft: "16px",
    float: "right",
    fontFamily: "Segoe UI",
  },
  searchText: {
    marginLeft: "8px",
  },
});

//// prettier-ignore
export default class EditableGridWebPart extends React.Component<
  IEditableGridWebPartProps,
  IEditableGridWebPartState
> {
  private _columns: IColumnConfig[];
  constructor(props: IEditableGridWebPartProps) {
    super(props);

    this.state = {
      items: [],
    };

    this._columns = [
      {
        key: "id",
        name: "ID",
        text: "ID",
        editable: false,
        dataType: "number",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        includeColumnInExport: true,
        includeColumnInSearch: true,
        applyColumnFilter: true,
        disableSort: true,
      },
      {
        key: "customerhovercol",
        name: "Custom Hover Column",
        text: "Custom Hover Column",
        editable: true,
        dataType: "string",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        includeColumnInExport: false,
        includeColumnInSearch: false,
        applyColumnFilter: false,
        disableSort: true,
        //hoverComponentOptions: { enable:true, hoverChildComponent: <CellHover customProps={{ someProp: '' }} /> }
      },
      {
        key: "name",
        name: "Name",
        text: "Name",
        editable: true,
        dataType: "string",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        includeColumnInExport: true,
        includeColumnInSearch: true,
        applyColumnFilter: true,
      },
      {
        key: "age",
        name: "Age",
        text: "Age",
        editable: true,
        dataType: "number",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        includeColumnInExport: true,
        includeColumnInSearch: true,
        applyColumnFilter: true,
      },
      {
        key: "designation",
        name: "Designation",
        text: "Designation",
        editable: true,
        dataType: "string",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        includeColumnInExport: true,
        includeColumnInSearch: true,
        inputType: EditControlType.MultilineTextField,
        applyColumnFilter: true,
      },
      {
        key: "salary",
        name: "Salary",
        text: "Salary",
        editable: true,
        dataType: "number",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        includeColumnInExport: false,
        includeColumnInSearch: true,
        maxLength: 5,
        applyColumnFilter: true,
        cellStyleRule: {
          enable: true,
          rule: {
            operator: NumberAndDateOperators.LESSTHAN,
            value: 50000,
          },
          whenTrue: { textColor: "#EF5350", fontWeight: "bold" },
          whenFalse: { textColor: "#9CCC65" },
        },
      },
      {
        key: "dateofjoining",
        name: "Date of Joining",
        text: "Date of Joining",
        editable: true,
        dataType: "date",
        minWidth: 150,
        maxWidth: 150,
        isResizable: true,
        includeColumnInExport: true,
        includeColumnInSearch: true,
        inputType: EditControlType.Date,
      },
      {
        key: "payrolltype",
        name: "Payroll Type",
        text: "Payroll Type",
        editable: true,
        dataType: "string",
        minWidth: 150,
        maxWidth: 150,
        isResizable: true,
        includeColumnInExport: true,
        includeColumnInSearch: true,
        inputType: EditControlType.DropDown,
        dropdownValues: [
          { key: "weekly", text: "Weekly" },
          { key: "biweekly", text: "Bi-Weekly" },
          { key: "monthly", text: "Monthly" },
        ],
      },
      {
        key: "employmenttype",
        name: "Employment Type",
        text: "Employment Type",
        editable: true,
        dataType: "string",
        minWidth: 200,
        maxWidth: 200,
        isResizable: true,
        includeColumnInExport: true,
        includeColumnInSearch: true,
        inputType: EditControlType.Picker,
        pickerOptions: {
          pickerTags: [
            "Employment Type1",
            "Employment Type2",
            "Employment Type3",
            "Employment Type4",
            "Employment Type5",
            "Employment Type6",
            "Employment Type7",
            "Employment Type8",
            "Employment Type9",
            "Employment Type10",
            "Employment Type11",
            "Employment Type12",
          ],
          minCharLimitForSuggestions: 2,
          tagsLimit: 1,
          pickerDescriptionOptions: {
            enabled: true,
            values: [
              {
                key: "Employment Type1",
                description: "Employment Type1 Description",
              },
              {
                key: "Employment Type2",
                description: "Employment Type2 Description",
              },
              {
                key: "Employment Type3",
                description: "Employment Type3 Description",
              },
              {
                key: "Employment Type4",
                description: "Employment Type4 Description",
              },
              {
                key: "Employment Type5",
                description: "Employment Type5 Description",
              },
              {
                key: "Employment Type6",
                description: "Employment Type6 Description",
              },
              {
                key: "Employment Type7",
                description: "Employment Type7 Description",
              },
              {
                key: "Employment Type8",
                description: "Employment Type8 Description",
              },
              {
                key: "Employment Type9",
                description: "Employment Type9 Description",
              },
              {
                key: "Employment Type10",
                description: "Employment Type10 Description",
              },
              {
                key: "Employment Type11",
                description: "Employment Type11 Description",
              },
              {
                key: "Employment Type12",
                description: "Employment Type12 Description",
              },
            ],
          },
          suggestionsRule: StringOperators.STARTSWITH,
        },
      },
    ];
  }

  public async componentDidMount(): Promise<void> {
    await this.getALLItems();
  }

  private getALLItems = async (): Promise<void> => {
    const dummyData = [
      {
        id: "1",
        customerhovercol: "Hover Me",
        name: "Name1",
        age: 32,
        designation: "Designation1",
        salary: 57000,
        dateofjoining: "2010-04-01T14:57:10",
        payrolltype: "Weekly",
        employmenttype: "Employment Type11",
      },
      {
        id: "2",
        customerhovercol: "Hover Me",
        name: "Name2",
        age: 27,
        designation: "Designation2",
        salary: 42000,
        dateofjoining: "2014-06-09T14:57:10",
        payrolltype: "Monthly",
        employmenttype: "Employment Type4",
      },
      {
        id: "3",
        customerhovercol: "Hover Me",
        name: "Name3",
        age: 35,
        designation: "Designation3",
        salary: 75000,
        dateofjoining: "2005-07-02T14:57:10",
        payrolltype: "Weekly",
        employmenttype: "Employment Type7",
      },
      {
        id: "4",
        customerhovercol: "Hover Me",
        name: "Name4",
        age: 30,
        designation: "Designation4",
        salary: 49000,
        dateofjoining: "2019-04-01T14:57:10",
        payrolltype: "Bi-Weekly",
        employmenttype: "Employment Type2",
      },
    ];

    this.setState({ items: dummyData });
  };

  public render(): React.ReactElement<IEditableGridWebPartProps> {
    return (
      <div className={classNames.wrapper}>
        <div className={styles.grid}>
          <div className={styles.row}>
            <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
              <EditableGrid
                id={1}
                columns={this._columns}
                items={this.state.items}
                enableCellEdit={true}
                enableExport={true}
                enableTextFieldEditMode={true}
                enableTextFieldEditModeCancel={true}
                enableGridRowsDelete={true}
                enableGridRowsAdd={true}
                height={"70vh"}
                width={"140vh"}
                position={"relative"}
                enableUnsavedEditIndicator={true}
                //onGridSave={onGridSave}
                enableGridReset={true}
                enableColumnFilters={true}
                enableColumnFilterRules={true}
                enableRowAddWithValues={{
                  enable: true,
                  enableRowsCounterInPanel: true,
                }}
                layoutMode={DetailsListLayoutMode.justified}
                selectionMode={SelectionMode.multiple}
                enableRowEdit={true}
                enableRowEditCancel={true}
                enableBulkEdit={true}
                enableColumnEdit={true}
                enableSave={true}
                // customCommandBarItems={[
                //     {
                //         key: "CustomCommandBarItem1",
                //         name: "Custom Command Bar Item1",
                //         iconProps: { iconName: "Download" },
                //         onClick: () => {
                //           alert('Clicked');
                //         },
                //     }
                // ]}
              />
            </ScrollablePane>
          </div>
        </div>
      </div>
    );
  }
}
