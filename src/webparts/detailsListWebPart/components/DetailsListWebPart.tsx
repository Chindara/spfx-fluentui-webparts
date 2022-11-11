import * as React from "react";
import styles from "./DetailsListWebPart.module.scss";
import { IDetailsListWebPartProps } from "./IDetailsListWebPartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  ConstrainMode,
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IconButton,
  IDetailsHeaderProps,
  IIconProps,
  IRenderFunction,
  ITooltipHostProps,
  Link,
  mergeStyleSets,
  ScrollablePane,
  ScrollbarVisibility,
  SelectionMode,
  Sticky,
  StickyPositionType,
  TooltipHost,
} from "office-ui-fabric-react";
import {
  IDetailsListWebPartState,
  IRecruitmentTracker,
} from "../../../models/IDetailsListWebPartState";
import CommonService from "../../../services/CommonService";

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

const iconButtonStyles = {
  root: {
    marginTop: "-8px",
  },
};

const linkedInIcon: IIconProps = { iconName: "LinkedInLogo" };

// prettier-ignore
export default class DetailsListWebPart extends React.Component<IDetailsListWebPartProps, IDetailsListWebPartState> {
  private commonService: CommonService;
  private _columns: IColumn[];

  constructor(props: IDetailsListWebPartProps) {
    super(props);

    this.commonService = new CommonService(this.props.context);
    this.state = {
      items: [],
    };

    // prettier-ignore
    this._columns = [
      { key: 'column1', name: 'Candidate Name', fieldName: 'Title', minWidth: 120, maxWidth: 120, isResizable: false },
      { key: 'column2', name: 'Position', fieldName: 'Position', minWidth: 100, maxWidth: 100, isResizable: false, isMultiline: true },
      { key: 'column3', name: 'Progress', fieldName: 'Progress', minWidth: 100, maxWidth: 100, isResizable: false, isMultiline: true },
      { key: 'column4', name: 'Interview Date', fieldName: 'InterviewDate', minWidth: 100, maxWidth: 100, isResizable: false },
      { key: 'column5', name: '', fieldName: 'LinkedInProfile', minWidth: 30, maxWidth: 30, isResizable: false, isIconOnly: true, onRender: (item: IRecruitmentTracker) => (
		<IconButton
		  styles={iconButtonStyles}
		  iconProps={linkedInIcon}
		  onClick={() =>this.setViewRedirect(item.LinkedInProfile)}
		/>
	  )},
  ];
  }

  public async componentDidMount(): Promise<void> {
    await this.getALLItems();
  }

  private getALLItems = async (): Promise<void> => {
    const allItems = await this.commonService.getCandidates();
	console.log(allItems);
    this.setState({items: allItems});
  };

  private setViewRedirect(redirect: object) {
	let linkvalue: object = redirect;
	const Url = linkvalue["Url"];

    setTimeout(() => {
      window.location.href = Url;
    }, 3000);
  }

  // prettier-ignore
  private onRenderItemColumn( item: IRecruitmentTracker, index: number, column: IColumn): JSX.Element {
	// prettier-ignore
    const fieldContent = item[ column.fieldName as keyof IRecruitmentTracker ] as string;

    switch (column.key) {
      case "column5":
        return (<IconButton iconProps={linkedInIcon} styles={iconButtonStyles} onClick={() =>this.setViewRedirect(item.LinkedInProfile)}/>);

      default:
        return <span>{fieldContent}</span>;
    }
  }

  // prettier-ignore
  public onRenderDetailsHeader(props: IDetailsHeaderProps,defaultRender?: IRenderFunction<IDetailsHeaderProps>): JSX.Element {
    return (
      <Sticky
        stickyPosition={StickyPositionType.Header}
        isScrollSynced={true}
      >
        {defaultRender &&
          defaultRender({
            ...props,
            onRenderColumnHeaderTooltip: (
              tooltipHostProps: ITooltipHostProps
            ) => <TooltipHost {...tooltipHostProps} />,
          })}
      </Sticky>
    );
  }

  public render(): React.ReactElement<IDetailsListWebPartProps> {
    return (
      <div className={classNames.wrapper}>
        <div className={styles.grid}>
          <div className={styles.row}>
            <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
              <DetailsList
                compact={true}
                items={this.state.items}
                columns={this._columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.fixedColumns}
                constrainMode={ConstrainMode.unconstrained}
                onRenderDetailsHeader={this.onRenderDetailsHeader}
                selectionMode={SelectionMode.none}
              />
            </ScrollablePane>
          </div>
        </div>
      </div>
    );
  }
}
