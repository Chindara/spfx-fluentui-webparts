import * as React from "react";
import { ICommandBarWebPartProps } from "./ICommandBarWebPartProps";
import {
  CommandBar,
  IButtonProps,
  ICommandBarItemProps,
} from "office-ui-fabric-react";
import { setVirtualParent } from '@fluentui/dom-utilities';

const overflowProps: IButtonProps = { ariaLabel: "More commands" };

export default class CommandBarWebPart extends React.Component<
  ICommandBarWebPartProps,
  {}
> {
  private _items: ICommandBarItemProps[];
  private _overflowItems: ICommandBarItemProps[];
  private _farItems: ICommandBarItemProps[];

  constructor(props: ICommandBarWebPartProps) {
    super(props);

    this._items = [
      {
        key: "newItem",
        text: "New",
        cacheKey: "myCacheKey", // changing this key will invalidate this item's cache
        iconProps: { iconName: "Add" },
        subMenuProps: {
          items: [
            {
              key: "emailMessage",
              text: "Email message",
              iconProps: { iconName: "Mail" },
              ["data-automation-id"]: "newEmailButton", // optional
            },
            {
              key: "calendarEvent",
              text: "Calendar event",
              iconProps: { iconName: "Calendar" },
            },
          ],
        },
      },
      {
        key: "upload",
        text: "Upload",
        iconProps: { iconName: "Upload" },
        subMenuProps: {
          items: [
            {
              key: "uploadfile",
              text: "File",
              preferMenuTargetAsEventTarget: true,
              onClick: (
                ev?:
                  | React.MouseEvent<HTMLElement, MouseEvent>
                  | React.KeyboardEvent<HTMLElement>
                  | undefined
              ) => {
                ev?.persist();

                Promise.resolve().then(() => {
                  const inputElement = document.createElement("input");
                  inputElement.style.visibility = "hidden";
                  inputElement.setAttribute("type", "file");

                  document.body.appendChild(inputElement);

                  const target = ev?.target as HTMLElement | undefined;

                  if (target) {
                    setVirtualParent(inputElement, target);
                  }

                  inputElement.click();

                  if (target) {
                    setVirtualParent(inputElement, null);
                  }

                  setTimeout(() => {
                    inputElement.remove();
                  }, 10000);
                });
              },
            },
            {
              key: "uploadfolder",
              text: "Folder",
              preferMenuTargetAsEventTarget: true,
              onClick: (
                ev?:
                  | React.MouseEvent<HTMLElement, MouseEvent>
                  | React.KeyboardEvent<HTMLElement>
                  | undefined
              ) => {
                ev?.persist();

                Promise.resolve().then(() => {
                  const inputElement = document.createElement("input");
                  inputElement.style.visibility = "hidden";
                  inputElement.setAttribute("type", "file");

                  (
                    inputElement as { webkitdirectory?: boolean }
                  ).webkitdirectory = true;

                  document.body.appendChild(inputElement);

                  const target = ev?.target as HTMLElement | undefined;

                  if (target) {
                    setVirtualParent(inputElement, target);
                  }

                  inputElement.click();

                  if (target) {
                    setVirtualParent(inputElement, null);
                  }

                  setTimeout(() => {
                    inputElement.remove();
                  }, 10000);
                });
              },
            },
          ],
        },
      },
      {
        key: "share",
        text: "Share",
        iconProps: { iconName: "Share" },
        onClick: () => console.log("Share"),
      },
      {
        key: "download",
        text: "Download",
        iconProps: { iconName: "Download" },
        onClick: () => console.log("Download"),
      },
      {
        key: "authorize",
        text: "Authorize",
        iconProps: { iconName: "CheckMark" },
        onClick: () => console.log("Authorize"),
      },
      {
        key: "reject",
        text: "Reject",
        iconProps: { iconName: "Cancel" },
        onClick: () => console.log("Reject"),
      },
    ];

    this._overflowItems = [
      {
        key: "move",
        text: "Move to...",
        onClick: () => console.log("Move to"),
        iconProps: { iconName: "MoveToFolder" },
      },
      {
        key: "copy",
        text: "Copy to...",
        onClick: () => console.log("Copy to"),
        iconProps: { iconName: "Copy" },
      },
      {
        key: "rename",
        text: "Rename...",
        onClick: () => console.log("Rename"),
        iconProps: { iconName: "Edit" },
      },
    ];

    this._farItems = [
      {
        key: "tile",
        text: "Grid view",
        // This needs an ariaLabel since it's icon-only
        ariaLabel: "Grid view",
        iconOnly: true,
        iconProps: { iconName: "Tiles" },
        onClick: () => console.log("Tiles"),
      },
      {
        key: "info",
        text: "Info",
        // This needs an ariaLabel since it's icon-only
        ariaLabel: "Info",
        iconOnly: true,
        iconProps: { iconName: "Info" },
        onClick: () => console.log("Info"),
      },
    ];
  }

  public render(): React.ReactElement<ICommandBarWebPartProps> {
    return (
      <CommandBar
        items={this._items}
        overflowItems={this._overflowItems}
        overflowButtonProps={overflowProps}
        farItems={this._farItems}
        ariaLabel="Inbox actions"
      />
    );
  }
}
