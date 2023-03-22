import * as React from "react";
import { IOnePartProps } from "./IOnePartProps";
import {
  ILabelStyles,
  IStyleSet,
  Label,
  Pivot,
  PivotItem,
} from "office-ui-fabric-react";
import DetailsListWebPart from "../../detailsListWebPart/components/DetailsListWebPart";

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export default class OnePart extends React.Component<IOnePartProps, {}> {
  public render(): React.ReactElement<IOnePartProps> {
    return (
      <Pivot aria-label="Basic Pivot Example">
        <PivotItem headerText="Candidates">
          <DetailsListWebPart context={this.props.context} />
        </PivotItem>
        <PivotItem headerText="My interview">
          <Label styles={labelStyles}>Pivot #2</Label>
        </PivotItem>
      </Pivot>
    );
  }
}
