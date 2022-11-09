import * as React from "react";
import { IPivotWebPartProps } from "./IPivotWebPartProps";
import {
  ILabelStyles,
  IStyleSet,
  Label,
  Pivot,
  PivotItem,
} from "office-ui-fabric-react";

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export default class PivotWebPart extends React.Component<
  IPivotWebPartProps,
  {}
> {
  public render(): React.ReactElement<IPivotWebPartProps> {
    return (
      <Pivot aria-label="Basic Pivot Example">
        <PivotItem
          headerText="My Files"
          headerButtonProps={{
            "data-order": 1,
            "data-title": "My Files Title",
          }}
        >
          <Label styles={labelStyles}>Pivot #1</Label>
        </PivotItem>
        <PivotItem headerText="Recent">
          <Label styles={labelStyles}>Pivot #2</Label>
        </PivotItem>
        <PivotItem headerText="Shared with me">
          <Label styles={labelStyles}>Pivot #3</Label>
        </PivotItem>
      </Pivot>
    );
  }
}
