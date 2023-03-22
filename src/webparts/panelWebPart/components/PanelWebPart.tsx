import * as React from "react";
import { IPanelWebPartProps } from "./IPanelWebPartProps";
import {
  DefaultButton,
  Panel,
  PanelType,
  PrimaryButton,
} from "office-ui-fabric-react";
import { IPanelWebPartState } from "./IPanelWebPartState";

const buttonStyles = { root: { marginRight: 8 } };

export default class PanelWebPart extends React.Component<
  IPanelWebPartProps,
  IPanelWebPartState
> {
  constructor(props: IPanelWebPartProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  openPanel = async (): Promise<void> => {
    this.setState({ isOpen: true });
  };

  dismissPanel = async (): Promise<void> => {
    this.setState({ isOpen: false });
  };

  onSaveClick = async (): Promise<void> => {
    this.setState({ isOpen: false });
    console.log("Save button clicked.");
  };

  onCancelClick = async (): Promise<void> => {
    this.setState({ isOpen: false });
    console.log("Cancel button clicked.");
  };

  onRenderFooterContent = (): React.ReactElement => {
    return (
      <div>
        <PrimaryButton
          onClick={this.onSaveClick}
          styles={buttonStyles}
        >
          Save
        </PrimaryButton>
        <DefaultButton onClick={this.onCancelClick}>Cancel</DefaultButton>
      </div>
    );
  };

  public render(): React.ReactElement<IPanelWebPartProps> {
    return (
      <div>
        <DefaultButton
          text="Open panel"
          onClick={this.openPanel}
        />
        <Panel
          isOpen={this.state.isOpen}
          onDismiss={this.dismissPanel}
          type={PanelType.smallFixedFar}
          closeButtonAriaLabel="Close"
          headerText="Sample panel"
          onRenderFooterContent={this.onRenderFooterContent}
          isFooterAtBottom={true}
        >
          <p>Content goes here.</p>
        </Panel>
      </div>
    );
  }
}
